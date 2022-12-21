import { Task } from "../../../models/task";
import { UserRepository } from "../../users/repositories/user.repository";
import { TaskRepository } from "../repositories/task.repository";


interface RequestData{
    userId: string;
    id: string
}

export default class DeleteTask {
    private _taskRepository: TaskRepository;
    private _userRepository: UserRepository;

    constructor(taskRepository: TaskRepository, userRepository: UserRepository){
        this._taskRepository = taskRepository;
        this._userRepository = userRepository;
    }

    async execute({ userId, id }:RequestData): Promise<Task>{
        const userExists = await this._userRepository.verifyUserExistsById(userId);
        if (!userExists) {
            throw new Error("User não encontrado");
        }

        const taskExist = await this._taskRepository.verifyTaskExistById(id);
        if (!taskExist) {
            throw new Error("Recado não encontrado");
        }

        const task = await this._taskRepository.removeTask(id);

        return task;
    }
}