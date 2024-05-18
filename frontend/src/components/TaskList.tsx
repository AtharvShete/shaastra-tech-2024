import React from "react";
import { useQuery, gql } from "@apollo/client";
import TaskForm from "./TaskForm";
import './TaskList.css';

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

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<{ allTasks: Task[] }>(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="task-container">
      <h1>Tasks</h1>
      <TaskForm refetchTasks={refetch} />
      <ul className="task-list">
        {data?.allTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.completed ? "Done" : "Pending"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
