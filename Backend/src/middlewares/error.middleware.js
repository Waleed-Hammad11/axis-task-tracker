const globalError = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;

	return res.status(err.statusCode).json({
		success: false,
		status: err.statusCode >= 400 && err.statusCode < 500 ? 'fail' : 'error',
		message: err.message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
	});
};

export default globalError;
