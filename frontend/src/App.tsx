import React from "react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import TaskList from "./components/TaskList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <TaskList />
    </ApolloProvider>
  );
};

export default App;
