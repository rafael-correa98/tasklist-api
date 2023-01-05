import { TaskRepository } from '../../../../../src/app/features/tasks/repositories/task.repository'
import GetTasks from '../../../../../src/app/features/tasks/usecases/get-tasks.usecase'
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository'
import { Task } from '../../../../../src/app/models/task'
import { User } from '../../../../../src/app/models/user'
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository'
import { RedisCacheMock } from '../../../../../src/main/test/repository/RedisMockRepository'

jest.mock("ioredis", () => require("ioredis-mock"))

describe.skip("Testes usecase get-tasks", () => {
    test("Testa o método execute falhando no userExist", async () => {
        const sut = new GetTasks(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(false)
        expect(() => 
            sut.execute({ description: "description", userId: "userId", archived: "false" })
        ).rejects.toThrowError("User não encontrado")
    })

    test("Testa o método execute com sucesso com informações do cache", async () => {
        const sut = new GetTasks(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(true)

        jest
            .spyOn(RedisCacheMock.prototype, "get")
            .mockResolvedValue([new User("name", "password")])


            const response = await sut.execute({ description: "description", userId: "userId", archived: "false" })


            expect(response).toHaveLength(1)
    })

    test("Testa o método execute com sucesso sem informações do cache", async () => {
        const sut = new GetTasks(new TaskRepository(), new UserRepository(), new RedisCacheMock() as unknown as CacheRepository)

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsById")
            .mockResolvedValue(true)

        jest
            .spyOn(RedisCacheMock.prototype, "get")
            .mockResolvedValue(null)

        jest
            .spyOn(TaskRepository.prototype, "getTasks")
            .mockResolvedValue([new Task("description", "detail")])

        jest
            .spyOn(RedisCacheMock.prototype, "set")
            .mockResolvedValue()

            const response = await sut.execute({ description: "description", userId: "userId", archived: "false" })

            expect(response).toHaveLength(1)
            expect(response[0].description).toBe("description")
            expect(response[0].detail).toBe("detail")
    })
})