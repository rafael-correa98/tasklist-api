import { Task } from "../../../models/task";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../../users/repositories/user.repository";
import { TaskRepository } from "../repositories/task.repository";

interface RequestData{
    userId: string;
    id: string;
    archived: boolean;
}

export default class UpdateArchivedStatus {
    private _taskRepository: TaskRepository;
    private _userRepository: UserRepository;
    private _cacheRepository: CacheRepository;

    constructor(taskRepository: TaskRepository, userRepository: UserRepository, cacheRepository: CacheRepository){
        this._taskRepository = taskRepository;
        this._userRepository = userRepository;
        this._cacheRepository = cacheRepository;
    }

    async execute({ userId, id, archived }: RequestData): Promise<Task>{
        const userExists = await this._userRepository.verifyUserExistsById(userId);
        if (!userExists) {
            throw new Error("User não encontrado");
        }

        const taskExist = await this._taskRepository.verifyTaskExistById(id);
        if (!taskExist) {
            throw new Error("Recado não encontrado");
        }

        const task = await this._taskRepository.updateArchived(id, archived);

        await this._cacheRepository.delete(`tasks:${userId}`)

        return task;
    }
}