import * as jwt from 'jsonwebtoken';
import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import 'types/fastify/index.d';

const PUBLIC_ROUTES = new Set(['', 'authorization', 'healthcheck', 'playground']);
const ADMIN_ROUTES = new Set(['admin']);

export const CheckLogin = async (request: FastifyRequest, reply: FastifyReply) => {
	// return 200 when requesting static files
	if (request.url.includes('.')) {
		return reply.send();
	}
	if (!request.body) {
		request.body = {};
	}
	const urlPrefx = getUrlPrefix(request.url || '/');
	if (!PUBLIC_ROUTES.has(urlPrefx)) {
		const token = request.headers['authorization'];
		// throw error if token doesn't exist or not valid.
		if (!token || !(jwt.verify(token, process.env.ENCRYPTION_KEY || ''))) {
			return reply.status(401).send();
		}
		const decoded = jwt.decode(token);
		request.user = decoded || null as any;
	}
};

export const AdminOnly = async (request: FastifyRequest, reply: FastifyReply) => {
	const urlPrefx = getUrlPrefix(request.url || '/');
	// if user exists from IsLogin hook
	if (!request.user && !PUBLIC_ROUTES.has(urlPrefx)) {
		return reply.status(401).send();
	}
	if (ADMIN_ROUTES.has(urlPrefx) && request.user.type !== 'admin') {
		reply.status(403).send();
	}
};

const getUrlPrefix = (url: string) => {
	const parts = url.split('/').filter((x) => x !== '');
	if (parts.length > 0) {
		return parts[0].split('?')[0];
	} else {
		return '';
	}
};
