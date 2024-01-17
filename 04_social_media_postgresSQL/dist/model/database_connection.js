"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.databaseConnection = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: '75way',
    host: 'localhost',
    database: 'socialmediadb',
    password: '1234',
    port: 5432, // default port for PostgreSQL
});
exports.pool = pool;
const databaseConnection = () => {
    pool.connect((err, client, done) => {
        if (err) {
            console.error('Connection error', err.stack);
            return;
        }
        if (!client) {
            console.error('Client is undefined');
            return;
        }
        console.log('Database connected');
        const createTableText = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(1000) NOT NULL,
        email VARCHAR(100) NOT NULL  ,
        fullname VARCHAR(100) NOT NULL
      )
    `;
        const createPostTableText = `
      CREATE TABLE IF NOT EXISTS posts (
        pid SERIAL PRIMARY KEY,
        uid INTEGER REFERENCES users(id),
        post TEXT
      )
    `;
        const createCommentTableText = `
      CREATE TABLE IF NOT EXISTS comments (
        cid SERIAL PRIMARY KEY,
        pid INTEGER REFERENCES posts(pid),
        comment TEXT
      )
    `;
        client.query(createCommentTableText, (err, res) => {
            done(); // release the client back to the pool
            if (err) {
                console.error('Error creating comment table', err.stack);
                return;
            }
            console.log('Comments Table created');
        });
    });
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
    });
};
exports.databaseConnection = databaseConnection;
