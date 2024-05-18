import { TaskData } from "./data-source.js";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "./typeDefs.js";
import TaskResolver from "./TaskResolvers.js";
const resolvers = { ...TaskResolver };
async function ServerConnection() {
    try {
        await TaskData.initialize()
            .then(async () => {
            console.log("DB connected sucessfully");
        })
            .catch(error => console.log(error));
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        console.log(`🚀  Server ready at: ${url}`);
    }
    catch (error) {
        console.log(error);
    }
}
ServerConnection();
