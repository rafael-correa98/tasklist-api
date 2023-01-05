import { TaskRepository } from '../../../../../src/app/features/tasks/repositories/task.repository'
import DeleteTask from '../../../../../src/app/features/tasks/usecases/delete-task.usecase'
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository'
import { Task } from '../../../../../src/app/models/task'
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository'
import { RedisCacheMock } from '../../../../../src/main/test/repository/RedisMockRepository'

jest.mock("ioredis", () => require("ioredis-mock"))

describe.skip("Testes usecase delete-task", () => {
    test("Testa o método execute falhando no userExist", async () => {
        const sut = new DeleteTask(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(false)
        expect(() => 
            sut.execute({ userId: "userId", id: "id" })
        ).rejects.toThrowError("User não encontrado")
    })

    test("Testa o método execute falhando no taskExist", async () => {
        const sut = new DeleteTask(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(true)

        jest
            .spyOn(TaskRepository.prototype, "verifyTaskExistById")
            .mockResolvedValue(false)
        expect(() => 
            sut.execute({ userId: "userId", id: "id" })
        ).rejects.toThrowError("Recado não encontrado")
    })

    test("Testa o método execute com sucesso", async () => {
        const sut = new DeleteTask(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(true)

        jest
            .spyOn(TaskRepository.prototype, "verifyTaskExistById")
            .mockResolvedValue(true)

        jest
            .spyOn(TaskRepository.prototype, "removeTask")
            .mockResolvedValue(new Task("description", "detail"))
        jest
            .spyOn(RedisCacheMock.prototype, "delete")
            .mockResolvedValue()

            const response = await sut.execute({ userId: "userId", id: "id" })

            expect(response.id).toBeTruthy()
            expect(response.description).toBe("description")
            expect(response.detail).toBe("detail")
            expect(response.archived).toBeFalsy()
    })
})