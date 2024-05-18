import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import './TaskForm.css';

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

interface TaskFormProps {
  refetchTasks: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ refetchTasks }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      setNewTask({ title: "", description: "", completed: false });
      refetchTasks();
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, completed: e.target.checked });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({
      variables: {
        title: newTask.title,
        description: newTask.description,
        completed: newTask.completed,
      },
    });
  };

  return (
    <form onSubmit={handleCreateTask} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newTask.title}
        onChange={handleInputChange}
        required
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
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Task"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default TaskForm;
