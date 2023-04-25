import * as fs from 'fs';
import * as dotenv from 'dotenv';
import Fastify, { FastifyInstance } from 'fastify';
import { AdminOnly, CheckLogin } from './middleware/authorization';
import cors from './middleware/cors';

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
	reply.status(error.statusCode || 500).send(response);
});

process.on('uncaughtException', (error) => console.error(error));
process.on('unhandledRejection', (error) => console.error(error));

export default fastify;
