import { TaskRepository } from '../../../../../src/app/features/tasks/repositories/task.repository'
import CreateTask from '../../../../../src/app/features/tasks/usecases/create-task.usecase'
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository'
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository'
import { RedisCacheMock } from '../../../../../src/main/test/repository/RedisMockRepository'

jest.mock("ioredis", () => require("ioredis-mock"))

describe.skip("Testes usecase create-task", () => {
    test("Testa o método execute falhando no userExist", async () => {
        const sut = new CreateTask(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(false)

        expect(() => 
            sut.execute({ userId: "userId", description: "description", detail: "detail" })
        ).rejects.toThrowError("User não encontrado")
    })

    test("Testa o método execute com sucesso", async () => {
        const sut = new CreateTask(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(true)

        jest
            .spyOn(TaskRepository.prototype, "createTask")
            .mockResolvedValue()

        jest
            .spyOn(RedisCacheMock.prototype, "delete")
            .mockResolvedValue()

            const response = await sut.execute({ userId: "userId", description: "description", detail: "detail" })

            expect(response.id).toBeTruthy()
            expect(response.description).toBe("description")
            expect(response.detail).toBe("detail")
            expect(response.archived).toBeFalsy()
    })
})