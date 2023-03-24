import fastify from 'fastify';

declare module 'fastify' {
	interface FastifyRequest {
		user: {
			id: string;
			_id: string;
			type: string;
		};
	}

	interface FastifyError {
		statCode: number;
	}
}