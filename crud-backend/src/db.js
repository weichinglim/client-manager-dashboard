import pg from "pg";
import env from "dotenv"; // For security is best practice

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect(); //connect to our database

//error handling
db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = (text, params) => db.query(text,params);


// Note 
// process.env. - imports contents of .env file into db.js 
// (password, user wont be directly seen) 