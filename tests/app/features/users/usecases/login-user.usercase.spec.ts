import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository'
import LoginUser from '../../../../../src/app/features/users/usecases/login-user.usercase'
import { User } from '../../../../../src/app/models/user'

describe.skip("Testes usecase login-user", () => {
    test("Testa o método execute falhando no passwordConfirm", async () => {
        const sut = new LoginUser(new UserRepository())
        const user = new User("name", "password")

        jest
            .spyOn(UserRepository.prototype, "findUserByName")
            .mockResolvedValue(user)

        expect(() => 
            sut.execute({ name: "name", password: "password"})
        ).rejects.toThrowError("Senha inválida")
    })
})