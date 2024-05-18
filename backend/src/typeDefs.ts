import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
    allTasks: [Task!]!
    taskById(id: ID!): Task
    completedTasks: [Task!]!
    pendingTasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!, description: String): Task!
    updateTask(
      id: ID!
      title: String
      description: String
      completed: Boolean
    ): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

export default typeDefs;