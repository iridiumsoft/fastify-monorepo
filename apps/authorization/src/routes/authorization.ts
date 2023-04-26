import app from 'utils/app';
import Login from '~/services/login';

app.register(
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
