import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
    logging: false,
    migrations: [__dirname + "/migrations/*{.ts,.js}"],

});
