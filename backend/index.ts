import { ApolloServer} from "apollo-server";
import typeDefs from "./schema";
import { createConnection } from "typeorm";
import { Task } from "./task.entity";
import { TaskResolver } from "./task.resolver";

const resolvers = {...TaskResolver};

const startServer = async () => {
    await createConnection({
        type: "postgres",
        database: "task",
        username: "postgres",
        password: "atharv2310",
        entities: [Task],
        synchronize: true, 
    });

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    const port = process.env.PORT || 4000;

    apolloServer.listen(port, () =>
        console.log(`Server is running on port ${port}`)
    );
};

startServer();
