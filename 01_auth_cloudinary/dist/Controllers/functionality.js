"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.authenticator = exports.logout = exports.alluserdata = exports.registeruser = exports.loginuser = void 0;
const database_js_1 = require("../Models/database.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// registration functionality
const accessSecret = process.env.ACCESS_SECRET || '';
const registeruser = async (req, res) => {
    const data = req.body;
    let email1 = data.email;
    let username1 = data.username;
    let password1 = data.password;
    // unique username
    const existingUser = await database_js_1.User.findOne({ username: data.username });
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }
    // Validate user
    if (!email1 || !username1 || !password1) {
        res.status(400).send('Missing user information');
        return;
    }
    // Validate email pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email1)) {
        res.status(400).send('Invalid email format');
        return;
    }
    // Validate password (at least 8 characters, including special symbols and digits)
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password1)) {
        res.status(400).send('Invalid password format');
        return;
    }
    // Encrypt the password and save it to the database
    const encryptAndSavePassword = async () => {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt_1.default.hash(password1, saltRounds);
            data.password = hashedPassword;
            const newUser = new database_js_1.User(data);
            await newUser.save();
            console.log('User data saved successfully');
        }
        catch (error) {
            console.error('Error saving user data:', error);
        }
    };
    encryptAndSavePassword();
    res.sendStatus(200);
};
exports.registeruser = registeruser;
// Authenticator middleware
const authenticator = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).send('Access token not found');
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(accessToken, accessSecret);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).send('Invalid token');
    }
};
exports.authenticator = authenticator;
const loginuser = async (req, res) => {
    const { username, password } = req.body;
    // Validate user input
    if (!username || !password) {
        res.status(400).send('Missing username or password');
        return;
    }
    // Find user in the database
    const user = await database_js_1.User.findOne({ username });
    if (!user) {
        res.status(400).send('User not found');
        return;
    }
    // Check password
    const validPassword = await bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        res.status(400).send('Invalid password');
        return;
    }
    const accessToken = (0, jsonwebtoken_1.sign)({
        id: user.id
    }, accessSecret, { expiresIn: '30m' });
    const refreshToken = (0, jsonwebtoken_1.sign)({
        id: user.id
    }, accessSecret, { expiresIn: '1w' });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    // User is authenticated
    console.log('user logged in');
    res.status(200).json(user);
};
exports.loginuser = loginuser;
// Fetch all user data including profile pictures
let alluserdata = async (req, res) => {
    // console.log(req.cookies['access-token']);
    const users = await database_js_1.User.find({}, 'username profilePicture');
    res.status(200).json(users);
};
exports.alluserdata = alluserdata;
// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await database_js_1.User.findByIdAndDelete(id);
        res.status(200).send('User deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting user');
    }
};
exports.deleteUser = deleteUser;
// update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, profilePicture } = req.body;
    try {
        const updatedUser = await database_js_1.User.findByIdAndUpdate(id, { email, profilePicture }, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).send('Error updating user');
    }
};
exports.updateUser = updateUser;
// logout
let logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send('Logged out successfully');
};
exports.logout = logout;
