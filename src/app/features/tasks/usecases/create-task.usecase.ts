import { Task } from "../../../models/task";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../../users/repositories/user.repository";
import { TaskRepository } from "../repositories/task.repository";


interface RequestData{
    userId: string;
    description: string;
    detail: string;
}

export default class CreateTask {
    private _taskRepository: TaskRepository;
    private _userRepository: UserRepository;
    private _cacheRepository: CacheRepository;

    constructor(taskRepository: TaskRepository, userRepository: UserRepository, cacheRepository: CacheRepository){
        this._taskRepository = taskRepository;
        this._userRepository = userRepository;
        this._cacheRepository = cacheRepository;
    }

    async execute({
        userId,
        description,
        detail,
    }: RequestData): Promise<Task> {
        const task = new Task(description, detail);

        const userExists = await this._userRepository.verifyUserExistsById(userId);
        if (!userExists) {
            throw new Error("User não encontrado");
        }

        await this._taskRepository.createTask(userId, task);

        await this._cacheRepository.delete(`tasks:${userId}`)
       
        return task;
    }
}