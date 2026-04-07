import Joi from 'joi';
import validate from '../../middlewares/validate.middleware.js';

const createTaskSchema = Joi.object({
	title: Joi.string().min(3).max(100).required().messages({
		'string.empty': 'title is required',
		'any.required': 'title is required',
		'string.min': 'title is too short',
		'string.max': 'title is too long',
	}),

	description: Joi.string().max(500).optional().messages({
		'string.max': 'description is too long',
	}),
});

export const createTaskValidator = validate(createTaskSchema);
