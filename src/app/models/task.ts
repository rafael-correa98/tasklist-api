import crypto from 'crypto'
import { User } from './user';

export class Task{
    private _id: string;
    get id(): string {
        return this._id
    }

    private _description: string;
    get description(): string {
        return this._description
    }
    
    private _detail: string;
    get detail(): string {
        return this._detail
    }

    private _archived: boolean = false
    get archived(): boolean {
        return this._archived
    }

    constructor(description: string, detail: string){
        this._id = crypto.randomUUID()
        this._description = description
        this._detail = detail
    }

    static create(
        id: string,
        description: string,
        detail: string,
        archived: boolean
    ): Task {
        const task = new Task(description, detail);
        task._id = id;
        task._archived = archived;

        return task;
    }

    toJson() {
        return {
            id: this._id,
            description: this._description,
            detail: this._detail,
            archived: this._archived
        }
    }
}