import { ApolloError } from "apollo-server-core";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "./task.entity";
import { getConnection } from "typeorm";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async allTasks(): Promise<Task[]> {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      throw new ApolloError("Failed to fetch tasks", "FETCH_TASKS_ERROR", {
        error,
      });
    }
  }

  @Query(() => Task, { nullable: true })
  async taskById(@Arg("id") id: number): Promise<Task | null> {
    try {
      const task = await Task.findOne({ where: { id } });
      return task || null;
    } catch (error) {
      throw new ApolloError("Failed to fetch task by ID", "FETCH_TASK_ERROR", {
        error,
      });
    }
  }

  @Mutation(() => Task)
  async createTask(
    @Arg("title") title: string,
    @Arg("description", { nullable: true }) description: string
  ): Promise<Task> {
    try {
      const newTask = Task.create({ title, description });
      await newTask.save();
      return newTask;
    } catch (error) {
      throw new ApolloError("Failed to create task", "CREATE_TASK_ERROR", {
        error,
      });
    }
  }

  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("id") id: number,
    @Arg("title", { nullable: true }) title: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("completed", { nullable: true }) completed: boolean
  ): Promise<Task | null> {
    try {
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        throw new ApolloError("Task not found", "TASK_NOT_FOUND");
      }

      if (title !== undefined) {
        task.title = title;
      }
      if (description !== undefined) {
        task.description = description;
      }
      if (completed !== undefined) {
        task.completed = completed;
      }

      await task.save();
      return task;
    } catch (error) {
      throw new ApolloError("Failed to update task", "UPDATE_TASK_ERROR", {
        error,
      });
    }
  }

  @Mutation(() => Boolean)
  async deleteTask(@Arg("id") id: number): Promise<boolean> {
    try {
      const result = await Task.delete(id);
      return !!result.affected;
    } catch (error) {
      throw new ApolloError("Failed to delete task", "DELETE_TASK_ERROR", {
        error,
      });
    }
  }
}
