import express from 'express';
import { NODE_ENV, PORT } from './config/env.js';
import taskRoutes from './routes/task.routes.js';
import globalError from './middlewares/error.middleware.js';
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1/tasks', taskRoutes);

app.use((req, res, next) => {
	const err = new Error(`can't find path ${req.originalUrl}`);
	err.statusCode = 404;
	next(err);
});

app.use(globalError);

app.listen(PORT, async () => {
	console.log(`Server started on http://localhost:${PORT}`);
	console.log(`connected to database in ${NODE_ENV} mode`);
	await connectToDatabase();
});

export default app;