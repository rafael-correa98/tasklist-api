import crypto from 'crypto'
import { Task } from './task';

export class User {
    private _id: string;
    get id(): string {
        return this._id
    }

    private _name: string;
    get name(): string {
        return this._name
    }

    private _password?: string;
    get password(): string | undefined {
        return this._password
    }

    private _tasks: Task[] = []
    get tasks(): Task[] {
        return [...this._tasks]
    }

    constructor(name: string, password: string) {
        this._id = crypto.randomUUID()
        this._name = name
        this._password = password
    }

    static create(
        id: string,
        name: string,
        password: string,
        tasks?: Task[]
    ): User {
        const user = new User(name, password);
        user._id = id;
        if(tasks){
            user._tasks = tasks
        }

        return user;
    }

    toJson() {
        return {
            id: this._id,
            name: this.name,
            password: this._password,
            tasks: this._tasks,
        }
    }

    removePassword() {
        this._password = undefined;
    }

}