import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entity/Task.js"

export const TaskData = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "atharv2310",
    database: "task",
    synchronize: true,
    entities: [Task],
    migrations: [],
    subscribers: [],
})
