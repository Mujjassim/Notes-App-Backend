import { Router } from 'express';
import taskController from '../controllers/taskController';

const router = Router();

router.get('/fetchAllTasks', taskController.fetchAllTasks);

export default router;

