import fastify from '~/app';
import Login from '~/services/login';

fastify.register(
	async (fastify) => {
		// Login using Email and Password
		fastify.get<{ Body: {} }>('/login', { schema: {} }, async (request) => {
			const r = await Login();
			return r;
		});
	},
	{
		prefix: '/authorization'
	}
);
