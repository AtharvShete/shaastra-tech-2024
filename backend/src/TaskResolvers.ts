import { ApolloError } from "apollo-server-errors";
import { Task } from "./entity/Task.js";
import { TaskData } from "./data-source.js";

const TaskResolver = {
  Query: {
    allTasks: async () => {
      try {
        const TaskRepository = TaskData.getRepository(Task);
        const tasks = await TaskRepository.find();
        return tasks;
      } catch (error) {
        throw new ApolloError("Failed to fetch tasks", "FETCH_TASKS_ERROR", {
          error,
        });
      }
    },
    taskById: async (_: any, { id }: { id: number }) => {
      try {
        const TaskRepository = TaskData.getRepository(Task);
        const task = await TaskRepository.findOne({ where: { id } });
        return task;
      } catch (error) {
        throw new ApolloError("Failed to fetch task by ID", "FETCH_TASK_ERROR", {
          error,
        });
      }
    },
    completedTasks: async () => {
      try {
        const TaskRepository = TaskData.getRepository(Task);
        const tasks = await TaskRepository.find({ where: { completed: true } });
        return tasks;
      } catch (error) {
        throw new ApolloError("Failed to fetch completed tasks", "FETCH_TASKS_ERROR", {
          error,
        });
      }
    },
    pendingTasks: async () => {
      try {
        const TaskRepository = TaskData.getRepository(Task);
        const tasks = await TaskRepository.find({ where: { completed: false } });
        return tasks;
      } catch (error) {
        throw new ApolloError("Failed to fetch pending tasks", "FETCH_TASKS_ERROR", {
          error,
        });
      }
    },
  },
  Mutation: {
    createTask: async (_: any, { title, description }: { title: string; description?: string }) => {
      try {
        const TaskRepository = TaskData.getRepository(Task);
        const task = TaskRepository.create({ title, description, completed: false });
        await TaskRepository.save(task);
        return task;
      } catch (error) {
        throw new ApolloError("Failed to create task", "CREATE_TASK_ERROR", {
          error,
        });
      }
    },
    updateTask: async (_: any, { id, title, description, completed }: { id: number; title?: string; description?: string; completed?: boolean }) => {
      try {
        const TaskRepository = TaskData.getRepository(Task);
        const task = await TaskRepository.findOne({ where: { id } });
        if (!task) {
          throw new ApolloError("Task not found", "TASK_NOT_FOUND");
        }
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;
        await TaskRepository.save(task);
        return task;
      } catch (error) {
        throw new ApolloError("Failed to update task", "UPDATE_TASK_ERROR", {
          error,
        });
      }
    },
    deleteTask: async (_: any, { id }: { id: number }) => {
      try {
        const TaskRepository = TaskData.getRepository(Task);
        const result = await TaskRepository.delete(id);
        return result.affected !== 0;
      } catch (error) {
        throw new ApolloError("Failed to delete task", "DELETE_TASK_ERROR", {
          error,
        });
      }
    },
  },
};

export default TaskResolver;
