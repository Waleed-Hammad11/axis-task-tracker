import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'must enter title Name'],
		maxLength: [100, 'shouldn"t be more than 100 '],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Task', TaskSchema);
