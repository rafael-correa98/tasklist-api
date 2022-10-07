import crypto from 'crypto'

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

    constructor(description: string, detail: string){
        this._id = crypto.randomUUID()
        this._description = description
        this._detail = detail
    }

    toJson(){
        return{
            id: this.id,
            description: this.description,
            datail: this.detail
        }
    }

    updateInformation(description: string, detail: string){
        if(!description) throw new Error("Descrição inválida")
        if(!detail) throw new Error("Detalhamento inválido")

        this._description = description
        this._detail = detail
    }

    
}