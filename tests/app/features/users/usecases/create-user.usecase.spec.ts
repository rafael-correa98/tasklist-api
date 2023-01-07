import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository'
import CreateUser from '../../../../../src/app/features/users/usecases/create-user.usecase'

describe("Testes usecase create-user", () => {
    test("Testa o método execute falhando no userExist", async () => {
        const sut = new CreateUser(new UserRepository())

        jest
            .spyOn(UserRepository.prototype, "verifyUserExistsByName")
            .mockResolvedValue(true)

        expect(() => 
            sut.execute({ name: "name", password: "password"})
        ).rejects.toThrowError("Usuário já existe")
    })
})