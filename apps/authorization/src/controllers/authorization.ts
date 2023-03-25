import fastify from '~/app';

fastify.register(
	async (fastify) => {
		// Login using Email and Password
		fastify.get<{ Body: {} }>('/login', { schema: {} }, async (request) => {
            return 'Login';
		});
	},
	{
		prefix: '/authorization'
	}
);
