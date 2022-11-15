import { pgHelper } from "../database/pg-helper";
import { User } from "../models/user";


export class UserRepository {
    async findAllUsers(): Promise<User[]> {
        const manager = pgHelper.client.manager;

        const usersEntities = await manager.find(User)
    }
}