import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { User } from "../../../models/user";

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