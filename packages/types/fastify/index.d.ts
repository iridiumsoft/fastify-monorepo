import fastify from 'fastify';

declare module 'fastify' {
	interface FastifyRequest {
		user: CurrentUser
	}
	
	interface FastifyError {
		statCode: number;
	}
}
