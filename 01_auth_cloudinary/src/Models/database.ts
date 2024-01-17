import mongoose from 'mongoose'


//connection

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://admin:'+process.env.DB_PASSWORD+'@cluster0.xgf8i8e.mongodb.net/Authenticator');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }


// schema

interface UserProfile {
    
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    country: string;
    languagePreference: string;
    phoneNumber: string;
    address: string;
    profilePicture: string;
}

const userSchema = new mongoose.Schema({
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
const User = mongoose.model('User', userSchema);



export {connectToDatabase,User};



