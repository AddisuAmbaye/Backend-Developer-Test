import http from 'http';
import dotenv from 'dotenv';
import app from './app/app.js';

dotenv.config();

// create the server
const PORT = process.env.PORT || 7000;
const server = http.createServer(app);
server.listen(PORT, () =>{
    console.log(`server is up and running on ${PORT}`)
});              