import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableTasks1671641948284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false,
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "detail",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "archived",
                        type: "boolean",
                        isNullable: false,
                        default: false
                    },
                    {
                        name: "create_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "current_timestamp"
                    },
                    {
                        name: "id_user",
                        type: "uuid",
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        name: "fk_id_user",
                        columnNames: ["id_user"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"]
                    })
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks", true, true, true)
    }

}
