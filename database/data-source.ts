import path from "node:path";
import { DataSource } from "typeorm";
import { Subreddit } from "./entities/subreddit.entity";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    entities: [Subreddit],
    synchronize: true,
    logging: false,
    migrations: [__dirname + "/migrations/*{.ts,.js}"],

});
