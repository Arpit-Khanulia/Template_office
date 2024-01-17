"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createcomment = exports.createpost = exports.imageupload = exports.login = exports.register = exports.userprofile = exports.viewpost = exports.viewcomment = exports.home = void 0;
const database_connection_1 = require("../model/database_connection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config({ path: __dirname + '/../../.env' });
// get
const home = (req, res) => {
    res.send('hello world');
};
exports.home = home;
const viewcomment = (req, res) => {
};
exports.viewcomment = viewcomment;
const viewpost = (req, res) => {
    console.log('ha bhai me logged in hu');
};
exports.viewpost = viewpost;
const userprofile = () => {
};
exports.userprofile = userprofile;
const register = async (req, res) => {
    const data = req.body;
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
    const client = await database_connection_1.pool.connect();
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
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const result = await client.query('INSERT INTO users(username, password, fullname, email) VALUES($1, $2, $3, $4)', [data.username, hashedPassword, data.fullname, data.email]);
    res.status(200).send('user_registered');
    // const result =  await client.query('INSERT INTO users(username, password, fullname, email) VALUES($1, $2, $3, $4)', [data.username, data.password, data.fullname, data.email])
    // res.status(200).send('user_registered');
    // const client  = await pool.connect();
    // const result =  client.query('INSERT INTO users(username, password, fullname, email) VALUES($1, $2, $3, $4)', [data.username, data.password, data.fullname, data.email])
    // res.status(200).send('user_registered');
};
exports.register = register;
const imageupload = () => {
};
exports.imageupload = imageupload;
const createpost = async (req, res) => {
    const id = req.id;
    const { post } = req.body;
    console.log(id);
    try {
        const client = await database_connection_1.pool.connect();
        const result = await client.query('INSERT INTO posts (uid, post) VALUES ($1, $2)', [id, post]);
        res.status(200).send(' Posts saved in the database');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.createpost = createpost;
const createcomment = () => {
};
exports.createcomment = createcomment;
const login = async (req, res) => {
    const { email, password, id } = req.body;
    const client = await database_connection_1.pool.connect();
    const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        res.status(400).send('Invalid email or password');
        return;
    }
    const validPassword = await bcrypt_1.default.compare(password, user.rows[0].password);
    if (!validPassword) {
        res.status(400).send('Invalid email or password');
        return;
    }
    const authToken = jsonwebtoken_1.default.sign({ id: user.rows[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userEmail: email }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '2h' });
    res.cookie('accessToken', authToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).send('Login successful');
};
exports.login = login;
