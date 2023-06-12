import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUniqueNameIndex1686603848685 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("CREATE UNIQUE INDEX IF NOT EXISTS Name_nocase_unique_idx ON subreddit(name COLLATE NOCASE);");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
