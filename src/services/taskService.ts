import redisClient from '../config/redisConfig';
import TaskModel, { ITask } from '../models/taskModel';

const REDIS_KEY = 'FULLSTACK_TASK_MUJJASSIM';

export async function fetchAllTasks(): Promise<string[]> {
    let tasks: string[] = await redisClient.get(REDIS_KEY).then(res => res ? JSON.parse(res) : []);
    
    const mongoTasks: ITask[] = await TaskModel.find();
    const allTasks = tasks.concat(...mongoTasks.flatMap(doc => doc.tasks)); // Flatten the array of arrays
    return allTasks;
}

export async function addTaskToRedis(task: string): Promise<void> {
    let tasks: string[] = await redisClient.get(REDIS_KEY).then(res => res ? JSON.parse(res) : []);
    tasks.push(task); // Safely push into the array
    await redisClient.set(REDIS_KEY, JSON.stringify(tasks));
    if (tasks.length > 50) {
       let modelTak =  await TaskModel.create({ tasks });
       await redisClient.del(REDIS_KEY);
    }
}

export default {
    fetchAllTasks,
    addTaskToRedis
};
