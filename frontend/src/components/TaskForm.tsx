import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

// Define your GraphQL mutation
const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String) {
    createTask(title: $title, description: $description) {
      id
      title
      description
      completed
    }
  }
`;


type CreateTaskMutationVariables = {
  title: string;
  description?: string;
};

type CreateTaskMutationResponse = {
  createTask: Task;
};

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createTask, { loading, error }] = useMutation<
    CreateTaskMutationResponse,
    CreateTaskMutationVariables
  >(CREATE_TASK);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) return;

    try {
      await createTask({ variables: { title, description } });
      setTitle('');
      setDescription('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};
