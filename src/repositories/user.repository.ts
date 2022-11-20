import { UserEntity } from "../database/entities/user.entity";
import { pgHelper } from "../database/pg-helper";
import { User } from "../models/user";


export class UserRepository {
    async createUser(user: User): Promise<void> {
        const manager = pgHelper.client.manager;

        const userEntity = manager.create(UserEntity, {
            id: user.id,
            name: user.name,
            password: user.password
        });

        await manager.save(userEntity)
    }

    async validateUser(name: string, password: string){
        const manager = pgHelper.client.manager;

        const userEntity = await manager.findOneOrFail(UserEntity, {
            where: {
                name,
                password
            },
            relations: {
                taskEntity: true
            }
        })
        
        return userEntity
    }


}