import { AppDataSource } from "../database/data-source";


if (require.main === module) {
    AppDataSource.initialize()
        .then(() => {
            // here you can start to work with your database
            console.log('database initialized')
        })
        .catch((error) => console.log(error))
}