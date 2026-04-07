import express from 'express';
import {
	createTask,
	deleteTask,
	getAllTasks,
	updateTask,
} from '../controllers/task.controller.js';
import { createTaskValidator } from '../utils/validators/taskValidator.js';

const router = express.Router();

router.route('/').get(getAllTasks).post(createTaskValidator, createTask);

router.route('/:id').patch(updateTask).delete(deleteTask);

export default router;
