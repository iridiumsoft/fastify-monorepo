import * as fs from 'fs';
import * as dotenv from 'dotenv';
import Fastify, { FastifyInstance } from 'fastify';
import { AdminOnly, CheckLogin } from 'middleware/authorization';
import cors from 'middleware/cors';
import {captureMessageWithRequestBody} from './sentry';

const envPath = __dirname + '/.env';

if (fs.existsSync(envPath)) {
	dotenv.config({ path: envPath });
}

const fastify: FastifyInstance = Fastify({
	maxParamLength: 1000
});

// Handle CORS
fastify.addHook('onRequest', cors);

// validate requests to make sure they are logged in
fastify.addHook('onRequest', CheckLogin);

// // validate admin only routes
fastify.addHook('onRequest', AdminOnly);

// error handling
fastify.setErrorHandler((error, request, reply) => {
	console.log(error.message);
	fastify.log.error(error);
	let response = {
		error: ''
	};
	// pass additional error data to the client if exists
	// @ts-ignore
	if (error.data) {
		// @ts-ignore
		response = { error: error.message, ...error.data };
	} else {
		response = { error: error.message };
	}
	const statusCode = error.statusCode || 500;
	if (statusCode < 600 && statusCode >= 500) {
		captureMessageWithRequestBody({
			message: error.message,
			level: 'error',
			user: request.user
		});
	}
	reply.status(statusCode).send(response);
});

process.on('uncaughtException', (error) => console.error(error));
process.on('unhandledRejection', (error) => console.error(error));

export default fastify;
