import { FindOperator, Like } from "typeorm";
import { Task } from "../../../models/task";
import databaseConnection from "../../../../main/database/database-connection";
import { TaskEntity } from "../../../shared/database/entities/task.entity";

export class TaskRepository {
    async createTask(userId: string, task: Task, ){
        const manager = databaseConnection.manager;

        const taskEntity = manager.create(TaskEntity, {
            id: task.id,
            description: task.description,
            detail: task.detail,
            userId: userId
        })

        await manager.save(taskEntity)
    }

    async getTasks(userId: string, description?: string, archived?: string): Promise<Task[]>{
        const manager = databaseConnection.manager;

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

        const tasks = tasksEntities.map((row) => {
            return Task.create(
                row.id,
                row.description,
                row.detail,
                row.archived
            )
        });

        return tasks;
    }

    async editTask(id: string, description: string, detail: string): Promise<Task>{
        const manager = databaseConnection.manager;

        await manager.update(
            TaskEntity,
            { id },
            {
                description,
                detail,
                updateAt: new Date()
            }
        )

        const taskEntity = await manager.findOne(TaskEntity, {
            where: {
                id
            }
        })

        const task = Task.create(
            id,
            description,
            detail,
            taskEntity?.archived!
        )

        return task
    }

    async removeTask(id: string): Promise<Task>{
        const manager = databaseConnection.manager;

        const taskEntity = await manager.findOne(TaskEntity, {
            where: {
                id
            }
        })

        await manager.delete(TaskEntity, { id })

        const task = Task.create(
            taskEntity?.id!,
            taskEntity?.description!,
            taskEntity?.detail!,
            taskEntity?.archived!
        )

        return task;
    }

    async updateArchived(id: string, archived: boolean): Promise<Task>{
        const manager = databaseConnection.manager;

        await manager.update(
            TaskEntity,
            { id },
            { archived }
        )

        const taskEntity = await manager.findOne(TaskEntity, {
            where: {
                id
            }
        })

        const task = Task.create(
            taskEntity?.id!,
            taskEntity?.description!,
            taskEntity?.detail!,
            taskEntity?.archived!
        )

        return task;
    }

    async verifyTaskExistById(id: string): Promise<boolean>{
        const manager = databaseConnection.manager;

        const taskEntity = await manager.findOne(TaskEntity, {
            where: {
                id: id
            }
        });

        return !!taskEntity
    }
}