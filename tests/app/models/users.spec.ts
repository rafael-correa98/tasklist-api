import { Task } from '../../../src/app/models/task'
import { User } from '../../../src/app/models/user'


describe.skip("Testes model Users", () => {
    test("Testa o costructor", () => {
        const sut = new User("name", "password")

        expect(sut.name).toBe("name")
        expect(sut.password).toBe("password")
        expect(sut).toBeInstanceOf(User)
    })

    test("Testa o método create", () => {
        const tasks = new Task("description", "detail")
        const sut = User.create("id","name", "password", [tasks])

        expect(sut.id).toBe("id")
        expect(sut.name).toBe("name")
        expect(sut.password).toBe("password")
        expect(sut.tasks).toEqual([tasks])
        expect(sut.tasks).toHaveLength(1)
    })

    test("Testa o método toJson", () => {
        const tasks = new Task("description", "detail")
        const sut = User.create("id","name", "password", [tasks])

        expect(sut.toJson()).toHaveProperty("id")
        expect(sut.toJson()).toHaveProperty("name", "name")
        expect(sut.toJson()).toHaveProperty("password", "password")
        expect(sut.toJson()).toHaveProperty("tasks")
    })

    test("Testa o método resetPassword", () => {
        const sut = User.create("id","name", "password")

        sut.removePassword()
        expect(sut.password).toBeUndefined()
    })
})