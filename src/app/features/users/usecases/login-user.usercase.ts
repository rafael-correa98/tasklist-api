import { UserRepository } from "../repositories/user.repository";
import { User } from "../../../models/user";

const bcrypt = require('bcrypt');

interface RequestData{
    name: string;
    password: string;
}

export default  class LoginUser {
    private _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async execute({
        name,
        password,
    }: RequestData): Promise<User> {
        const user = await this._userRepository.findUserByName(name);

        const passwordConfirm = await bcrypt.compare(password, user.password!);

        if (!passwordConfirm){
            throw new Error("Senha inválida");
        }

        user.removePassword()

        return user;
    }
}