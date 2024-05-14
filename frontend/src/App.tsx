import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import TaskList from './components/TaskList';
import {TaskForm} from './components/TaskForm';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Tasks</h1>
        <TaskForm />
        <TaskList />
      </div>
    </ApolloProvider>
  );
};

export default App;
