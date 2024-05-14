import React from "react";
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
    mutation createTask(
        $title: String!
        $description: String
        $completed: Boolean!
) {
    createTask(
        title: $title
        description: $description
        completed: $completed
    ) {
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
    const { loading, error, data } = useQuery<{ allTasks: Task[] }>(GET_TASKS);

    const [createTask] = useMutation(CREATE_TASK);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleCreateTask = async (
        title: string,
        description: string,
        completed: boolean
    ) => {
        try {
            // Call the createTask mutation
            await createTask({
                variables: {
                    title,
                    description,
                    completed,
                },
                refetchQueries: [{ query: GET_TASKS }],
            });
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div>
            <ul>
                {data?.allTasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.description} -{" "}
                        {task.completed ? "Done" : "Pending"}
                    </li>
                ))}
            </ul>
            {/* Add your form or button to trigger handleCreateTask here */}
        </div>
    );
};

export default TaskList;
