
import { User } from "../../../models/user";
import databaseConnection from "../../../../main/database/database-connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";
import { Task } from "../../../models/task";
import { type } from "os";

type TTaskEntity = {
    id: string;
    description: string;
    detail: string;
    archived: boolean;
}

export class UserRepository {
    async createUser(user: User, encryptedPassword: string): Promise<void> {
        const manager = databaseConnection.manager;

        const userEntity = manager.create(UserEntity, {
            id: user.id,
            name: user.name,
            password: encryptedPassword
        });

        await manager.save(userEntity);
    }

    async findUserByName(name: string): Promise<User>{
        const manager = databaseConnection.manager;

        const userEntity = await manager.findOne(UserEntity, {
            where: {
                name
            },
            relations: {
                tasksEntity: true
            }
        })

        if(!userEntity){
            throw new Error("Usuario não encontrado");
        }
        
        return User.create(
            userEntity.id, 
            userEntity.name, 
            userEntity.password, 
            userEntity.tasksEntity?.map(task => {
                return Task.create(
                    task.id,
                    task.description,
                    task.detail,
                    task.archived
                )
            }) 
        )
    }

    async verifyUserExistsByName(name: string): Promise<boolean> {
        const manager = databaseConnection.manager;

        const userEntity = await manager.findOne(UserEntity, {
            where: {
                name: name
            }
        });

        return !!userEntity;
    }

    async verifyUserExistsById(userId: string): Promise<boolean>{
        const manager = databaseConnection.manager;

        const userEntity = await manager.findOne(UserEntity, {
            where: {
                id: userId
            }
        });
      
        return !!userEntity;
    }
}