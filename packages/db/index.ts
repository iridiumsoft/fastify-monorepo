import {Client} from 'pg';

const client = new Client({
    connectionString: process.env.DB_URI
});

// Load all models

export default client;
