import Task from '../models/task.model.js';
import expressAsyncHandler from 'express-async-handler';
import ApiResponse from '../utils/ApiResponse.js';
import { TASK_MESSAGES } from '../constants/messages.js';
import {
	createTaskService,
	deleteTaskService,
	updateTaskService,
	getAllTasksService,
} from '../services/task.service.js';

export const createTask = expressAsyncHandler(async (req, res) => {
	const task = await createTaskService(req.body);
	return res.status(201).json(ApiResponse.success(TASK_MESSAGES.CREATED, task));
});


export const getAllTasks = expressAsyncHandler(async (req, res) => {
	
	const result = await getAllTasksService(req.query);

	return res.status(200).json(
		ApiResponse.success(TASK_MESSAGES.FETCHED, {
			items: result.tasks,
			pagination: {
				page:result.page,
				limit:result.limit,
				results: result.tasks.length,
			},
		}),
	);
});

export const updateTask = expressAsyncHandler(async (req, res) => {
	const tasks = await updateTaskService(req.params.id, req.body);

	if (!tasks) {
		return res
			.status(404)
			.json(ApiResponse.fail('There is no id match the task'));
	}
	return res
		.status(200)
		.json(ApiResponse.success(TASK_MESSAGES.UPDATED, tasks));
});

export const deleteTask = expressAsyncHandler(async (req, res) => {
	const task = await deleteTaskService(req.params.id);

	if (!task) {
		return res.status(404).json(ApiResponse.fail('task not found'));
	}

	return res.status(200).json(ApiResponse.success(TASK_MESSAGES.DELETED, task));
});
