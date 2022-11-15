import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "tasks" })
export class TaskEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    description!: string;

    @Column()
    detail!: string;

    @Column()
    archived!: boolean;

    @Column({ name: "create_at" })
    createAt!: Date;

    @Column({ name: "update_at" })
    updateAt!: Date;

    @Column({ name: "id_user" })
    idUser!: string;

    @ManyToOne(() => UserEntity, { eager: true })
    userEntity!: UserEntity;

    @BeforeUpdate()
    setUpdateAt(): void {
        this.updateAt = new Date();
    }
}