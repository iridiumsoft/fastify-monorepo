import app from 'utils/app';

// get app port from env or default to 3000
const port = process.env.PORT && process.env.PORT !== '' ? parseInt(process.env.PORT) : 3000;

const start = async () => {
	try {
		await app.listen({ port, host: '0.0.0.0' });
		console.log('App started on', port);
	} catch (err) {
		console.log(err);
		app.log.error(err);
		process.exit(1);
	}
};

app.get('/', async (request, reply) => {
	return "Fastify is working!"
});

start();