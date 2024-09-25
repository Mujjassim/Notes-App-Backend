import { Request, Response } from 'express';
import taskService from '../services/taskService';

export async function fetchAllTasks(req: Request, res: Response): Promise<void> {
    try {
        const tasks = await taskService.fetchAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
}

export async function handleMqttMessage(message: string): Promise<void> {
    try {
        const newTask = message.toString();
        await taskService.addTaskToRedis(newTask);
    } catch (error) {
        console.error('Failed to process MQTT message:', error);
    }
}

export default {
    fetchAllTasks,
    handleMqttMessage
};
