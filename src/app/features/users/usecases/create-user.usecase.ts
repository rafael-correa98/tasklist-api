import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";


interface RequestData{
    name: string;
    password: string;
}

export default  class CreateUser {
    private _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async execute({
        name,
        password,
    }: RequestData): Promise<User> {
        const userExists = await this._userRepository.verifyUserExistsByName(name)

        if (userExists) {
            throw new Error("Usuário já existe");
        }

        const encryptedPassword = await bcrypt.hash(password.toString(), 2);

        const user = new User(name, password);

        await this._userRepository.createUser(user, encryptedPassword);

        return user;
    }
}