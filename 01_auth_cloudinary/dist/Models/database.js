"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//connection
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect('mongodb+srv://admin:' + process.env.DB_PASSWORD + '@cluster0.xgf8i8e.mongodb.net/Authenticator');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
exports.connectToDatabase = connectToDatabase;
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    languagePreference: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    }
});
// model
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
