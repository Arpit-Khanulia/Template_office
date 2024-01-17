import express from "express";
import router from "./routers/routes.js";
import dotenv from 'dotenv';
dotenv.config();


// database connection
import {connectToDatabase} from './Models/database.js';
import cookieParser from "cookie-parser";

const app = express();



// middleware
app.use(cookieParser());
app.use(express.json());
app.use('/',router);


connectToDatabase();

// server listening
app.listen(3000, ()=> {
    console.log('server is running at port 3000');
})



