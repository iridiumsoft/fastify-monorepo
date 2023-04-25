import {Client} from 'pg';

const client = new Client({
    connectionString: process.env.DB_URI || 'postgres://postgres:1234@localhost:5432/aristotle'
});

export default client;
