import app from '~/app';
import './routes';
import dbclient from 'db/index';

// get app port from env or default to 3000
const port = process.env.PORT && process.env.PORT !== '' ? parseInt(process.env.PORT) : 3000;

app.get('/', async () => "Fastify 🚀");

const start = async () => {
	try {
		await app.listen({ port, host: '0.0.0.0' });
		await dbclient.connect();
		console.log(`Fastify 🚀 http://localhost:${port}`);
		app.ready();
	} catch (err) {
		console.log('Error starting app', err.message);
		app.log.error(err);
		process.exit(1);
	}
};

start();

export default app;
