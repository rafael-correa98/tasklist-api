import { Task } from '../../../src/app/models/task'

describe.skip("Testes model Tasks", () => {
    test("Testa o costructor", () => {
        const sut = new Task("description", "detail")

        expect(sut.description).toBe("description")
        expect(sut.detail).toBe("detail")
    })

    test("Testa o método create", () => {
        const sut = Task.create("id", "description", "detail", false)

        expect(sut.id).toBe("id")
        expect(sut.description).toBe("description")
        expect(sut.detail).toBe("detail")
        expect(sut.archived).toBeFalsy()
    })

    test("Testa o método toJson", () => {
        const sut = Task.create("id", "description", "detail", false)

        expect(sut.toJson()).toHaveProperty("id")
        expect(sut.toJson()).toHaveProperty("description")
        expect(sut.toJson()).toHaveProperty("detail")
        expect(sut.toJson()).toHaveProperty("archived", false)
    })
})