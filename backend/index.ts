import "dotenv/config";
import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import { createConnection } from "typeorm";
import { Task } from "./task.entity";
import { TaskResolver } from "./task.resolver";

const resolvers = {...TaskResolver};

const startServer = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: 5432,
            entities: [Task],
            synchronize: true,
        });

        console.log('Database connected successfully!');

        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers
        });

        const port = process.env.PORT || 4000;

        apolloServer.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        throw new Error('Failed to start the server');
    }
};

startServer();
