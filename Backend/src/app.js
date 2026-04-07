import express from 'express';
import { NODE_ENV, PORT } from './config/env.js';
import taskRoutes from './routes/task.routes.js';
import globalError from './middlewares/error.middleware.js';
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

connectToDatabase();

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

if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
	});
}

export default app;