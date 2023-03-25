import app from '~/app';
import './routes';

// get app port from env or default to 3000
const port = process.env.PORT && process.env.PORT !== '' ? parseInt(process.env.PORT) : 3000;

app.get('/', async () => "Fastify is fast!!!");

const start = async () => {
	try {
		await app.listen({ port, host: '0.0.0.0' });
		console.log('App started on', port);
		// import routes
		app.ready();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
