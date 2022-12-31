import { Task } from "../../../models/task";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../../users/repositories/user.repository";
import { TaskRepository } from "../repositories/task.repository";


interface RequestData{
    userId: string;
    description: string;
    archived: string;
}

export default class GetTasks {
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
        archived
    }: RequestData): Promise<Task[]> {
        const userExists = await this._userRepository.verifyUserExistsById(userId);
        if (!userExists) {
            throw new Error("User não encontrado");
        }

        let tasks =  await this._cacheRepository.get<Task[]>(`tasks:${userId}`)

        if(!tasks){
            tasks = await this._taskRepository.getTasks(userId, description, archived)
            await this._cacheRepository.set(`tasks:${userId}`, tasks.map(task => task.toJson()))
        }

       return tasks;
    }
}