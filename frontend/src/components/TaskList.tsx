import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

// Define the GraphQL queries and mutations
const GET_TASKS = gql`
  query allTasks {
    allTasks {
      id
      title
      description
      completed
    }
  }
`;

const CREATE_TASK = gql`
    mutation createTask($title: String!, $description: String, $completed: Boolean!) {
        createTask(title: $title, description: $description, completed: $completed) {
            id
            title
            description
            completed
    }
  }
`;

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const { loading, error, data = { allTasks: [] } } = useQuery<{ allTasks: Task[] }>(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, completed: e.target.checked });
  };

  const handleCreateTask = async () => {
    try {
      await createTask({
        variables: {
          title: newTask.title,
          description: newTask.description,
          completed: newTask.completed,
        },
        refetchQueries: [{ query: GET_TASKS }],
      });
      setNewTask({ title: "", description: "", completed: false });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      <ul>
        {data.allTasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.completed ? "Done" : "Pending"}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={newTask.completed}
            onChange={handleCheckboxChange}
          />
        </label>
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
    </div>
  );
};

export default TaskList;
