import { Task } from "../../../models/task";
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

    constructor(taskRepository: TaskRepository, userRepository: UserRepository){
        this._taskRepository = taskRepository;
        this._userRepository = userRepository;
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

        const tasks = await this._taskRepository.getTasks(userId, description, archived)

       return tasks;
    }
}