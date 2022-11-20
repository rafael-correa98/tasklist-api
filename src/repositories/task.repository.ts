import { FindOperator, Like } from "typeorm";
import { TaskEntity } from "../database/entities/task.entity";
import { pgHelper } from "../database/pg-helper";
import { Task } from "../models/task";

export class TaskRepository {
    async createTask(userId: string, task: Task, ){
        const manager = pgHelper.client.manager

        const taskEntity = manager.create(TaskEntity, {
            id: task.id,
            description: task.description,
            detail: task.detail,
            userId: userId
        })

        await manager.save(taskEntity)
    }

    async getTasks(userId: string, description?: string, archived?: string){
        const manager = pgHelper.client.manager

        let whereParams: { userId: string; description?: FindOperator<string>; archived?: boolean; } = { userId };

        if (archived) {
            whereParams = {
                ...whereParams,
                archived: archived === "true" ? true : false,
            };
        };

        if (description) {
            whereParams = {
              ...whereParams,
              description: Like(`%${description}%`),
            };
        };

        const tasksEntities = await manager.find(TaskEntity, {
            where: whereParams
        });

        return tasksEntities;
    }

    async editTask(id: string, description: string, detail: string){
        const manager = pgHelper.client.manager

        await manager.update(
            TaskEntity,
            { id },
            {
                description,
                detail,
                updateAt: new Date()
            }
        )

        const taskEntity = manager.findOne(TaskEntity, {
            where: {
                id
            }
        })

        return taskEntity
    }

    async removeTask(id: string){
        const manager = pgHelper.client.manager

        const taskEntity = manager.findOne(TaskEntity, {
            where: {
                id
            }
        })

        await manager.delete(TaskEntity, { id })

        return taskEntity
    }

    async updateArchived(id: string, archived: boolean){
        const manager = pgHelper.client.manager;

        await manager.update(
            TaskEntity,
            { id },
            { archived }
        )

        const taskEntity = manager.findOne(TaskEntity, {
            where: {
                id
            }
        })

        return taskEntity
    }
}