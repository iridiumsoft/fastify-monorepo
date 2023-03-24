export default class sendError extends Error {
	statusCode: number;
	data: any;
	
	constructor(statusCode: number, message: string, data?: any) {
		super(message);
		this.statusCode = statusCode;
		this.data = data;
		Error.captureStackTrace(this, this.constructor);
	}
}
