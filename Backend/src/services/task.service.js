import Task from '../models/task.model.js';

export const createTaskService = async (taskData) => {
	return await Task.create(taskData);
};

export const getAllTasksService = async (queryParameters) => {
	const queryObject = { ...queryParameters };
	const excludeFields = ['page', 'sort', 'limit', 'fields'];

	excludeFields.forEach((el) => delete queryObject[el]);

	let mongooseQuery = Task.find(queryObject);

	if (queryParameters.sort) {
		const sortBy = queryParameters.sort.split(',').join(' ');
		mongooseQuery = mongooseQuery.sort(sortBy);
	} else {
		mongooseQuery = mongooseQuery.sort('-createdAt');
	}

	const page = queryParameters.page * 1 || 1;
	const limit = queryParameters.limit * 1 || 10;
	const skip = (page - 1) * limit;

	mongooseQuery = mongooseQuery.skip(skip).limit(limit);

	const tasks = await mongooseQuery;

	return { tasks, page, limit };
};

export const updateTaskService = async (taskId, updateData) => {
	return await Task.findByIdAndUpdate(taskId, updateData, {
		returnDocument: 'after',
		runValidators: true,
	});
};

export const deleteTaskService = async (taskId) => {
	return await Task.findByIdAndDelete(taskId);
};
