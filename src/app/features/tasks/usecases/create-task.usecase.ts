import { Task } from "../../../models/task";
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

    constructor(taskRepository: TaskRepository, userRepository: UserRepository){
        this._taskRepository = taskRepository;
        this._userRepository = userRepository;
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

       return task;
    }
}