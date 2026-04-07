import mongoose from 'mongoose';

import { DB_URI } from '../config/env.js';

if (!DB_URI) {
	throw new Error(
		'please define the MONGODB_URL environment variable inside .env.<developement/production> local ',
	);
}

const connectToDatabase = async () => {
	if (mongoose.connection.readyState >= 1) return;
	try {
		await mongoose.connect(DB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.log('error connecting to database', error);

	}
};

export default connectToDatabase;
