
import express ,{Request,Response} from 'express';
import { databaseConnection,pool } from '../model/database_connection';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config({ path: __dirname+'/../../.env' });

// get

const home = (req:Request,res:Response)=>{

    res.send('hello world');
}

const viewcomment = (req:Request, res:Response)=>{





}

const viewpost = (req:Request,res:Response)=>{

    console.log('ha bhai me logged in hu');
    

}

const userprofile  = ()=>{


}


// post

interface data {
    username:string,
    password:string,
    fullname:string,
    email:string

}

const register = async (req:Request,res: Response)=>{

    const data:data = req.body
    console.log(data);


    // Validate email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        res.status(400).send('Invalid email format');
        return;
    }

    // Validate password pattern
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(data.password)) {
        res.status(400).send('Invalid password format');
        return;
    }

    const client  = await pool.connect();

    const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [data.username]);
    if (existingUser.rows.length > 0) {
        res.status(400).send('Username already exists');
        return;
    }

    const existingEmail = await client.query('SELECT * FROM users WHERE email = $1', [data.email]);
    if (existingEmail.rows.length > 0) {
        res.status(400).send('Email already exists');
        return;
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result =  await client.query('INSERT INTO users(username, password, fullname, email) VALUES($1, $2, $3, $4)', [data.username, hashedPassword, data.fullname, data.email])
    res.status(200).send('user_registered');
    

    // const result =  await client.query('INSERT INTO users(username, password, fullname, email) VALUES($1, $2, $3, $4)', [data.username, data.password, data.fullname, data.email])
    // res.status(200).send('user_registered');


    // const client  = await pool.connect();

    // const result =  client.query('INSERT INTO users(username, password, fullname, email) VALUES($1, $2, $3, $4)', [data.username, data.password, data.fullname, data.email])

    // res.status(200).send('user_registered');
    
}



const imageupload = ()=>{



}

const createpost = async (req: Request, res: Response) => {

    
    const id  = req.id;
    const { post } = req.body;

    console.log(id);
    
    
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO posts (uid, post) VALUES ($1, $2)', [id, post]);
        res.status(200).send(' Posts saved in the database');
    } catch (error) {
        console.log(error);
        
        res.status(500).send('Internal Server Error');
    }
    

}


const createcomment = ()=>{


}


const login = async (req:Request, res:Response) => {
    const { email, password,id } = req.body;
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        res.status(400).send('Invalid email or password');
        return;
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
        res.status(400).send('Invalid email or password')
        return;
    }
    const authToken = jwt.sign({id : user.rows[0].id},process.env.JWT_SECRET_KEY!,{expiresIn : '30m'}) ;
    const refreshToken = jwt.sign({userEmail : email},process.env.JWT_REFRESH_SECRET_KEY!,{expiresIn : '2h'}) ;
    res.cookie('accessToken', authToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).send('Login successful');
}





export { home ,viewcomment, viewpost, userprofile, register, login,imageupload,createpost,createcomment};