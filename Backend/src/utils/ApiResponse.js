import { ERROR, FAIL, SUCCESS } from '../constants/httpStatusText.js';

class ApiResponse {
	constructor(status, message, data) {
		this.status = status;
		this.message = message;
		this.data = data;
	}

	static success(message, data) {
		return new ApiResponse(SUCCESS, message, data);
	}

	static fail(message, data) {
		return new ApiResponse(FAIL, message, data);
	}

	static error(message, data) {
		return new ApiResponse(ERROR, message, data);
	}
}

export default ApiResponse;
