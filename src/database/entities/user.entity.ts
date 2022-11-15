import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @OneToMany(() => TaskEntity, "tasks")
    taskEntity!: TaskEntity[];
}