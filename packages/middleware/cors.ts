import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify/types/request';

const ALLOWED_ORIGINS: Record<string, 1> = {
	'http://localhost:3001': 1,
	'http://localhost:3002': 1,
	'http://localhost:8787': 1,
	'http://localhost:8788': 1,
	'https://app.weblit.com': 1
};

export default (req: FastifyRequest, reply: FastifyReply, done: any) => {
	const { origin } = req.headers;
	if (!origin || ALLOWED_ORIGINS[origin]) {
		reply.header('Access-Control-Allow-Origin', '*');
		reply.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
		reply.header('Access-Control-Allow-Headers', '*');
		const isPreflight = /options/i.test(req.method);
		if (isPreflight) {
			return reply.status(200).send();
		}
		done();
	} else {
		reply.status(403).send('Forbidden');
	}
};
