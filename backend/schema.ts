import { gql } from "@apollo/client";

const typeDefs = gql`
  type Task {
    id: Int!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
  allTasks: [Task!]!
    taskById(id: Int!): Task
    completedTasks: [Task!]!
    pendingTasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!, description: String): Task!
    updateTask(
      id: Int!
      title: String
      description: String
      completed: Boolean
    ): Task!
    deleteTask(id: Int!): Boolean!
  }
`;

export default typeDefs;
