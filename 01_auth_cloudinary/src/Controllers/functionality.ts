import  {Request,Response,NextFunction} from 'express';
import {User} from '../Models/database.js';
import bcrypt from 'bcrypt';
import {sign,verify} from 'jsonwebtoken'
import * as dotenv from 'dotenv';


dotenv.config();

// registration functionality

const accessSecret: string = process.env.ACCESS_SECRET || '';

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

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}




const registeruser = async(req:Request,res:Response)=>{

    const data:UserProfile = req.body;

    
    let email1 :string = data.email;
    let username1:string = data.username;
    let password1:string = data.password;


    // unique username
    const existingUser = await User.findOne({ username: data.username });
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
            const hashedPassword = await bcrypt.hash(password1, saltRounds);
            data.password = hashedPassword;
            const newUser = new User(data);
            await newUser.save();
            console.log('User data saved successfully');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };
    encryptAndSavePassword();


    res.sendStatus(200);

}


// Authenticator middleware
const authenticator = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    
    if (!accessToken) {
        return res.status(401).send('Access token not found');
    }
    try {
        const decoded = verify(accessToken, accessSecret);
        console.log(decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send('Invalid token');
    }
};





// login functionality

interface logindetails {
    
    username:string,
    email:string
    password:string,
    
}


const loginuser = async (req: Request, res: Response) => {
    const { username, password }: logindetails = req.body;
    
    // Validate user input
    if (!username || !password) {
        res.status(400).send('Missing username or password');
        return;
    }

    // Find user in the database
    const user = await User.findOne({ username });
    if (!user) {
        res.status(400).send('User not found');
        return;
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        res.status(400).send('Invalid password');
        return;
    }


    const accessToken = sign({
        id:user.id
    },accessSecret,{expiresIn:'30m'});


    const refreshToken = sign({
        id:user.id
    },accessSecret,{expiresIn:'1w'});


    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    

    // User is authenticated
    console.log('user logged in');
    
    res.status(200).json(user);
};



// Fetch all user data including profile pictures
let alluserdata = async (req: Request, res: Response) => {

    // console.log(req.cookies['access-token']);
    
    const users = await User.find({}, 'username profilePicture');
    res.status(200).json(users);
};



// delete user

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    

    try {
        
        await User.findByIdAndDelete(id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};


// update user

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, profilePicture } = req.body;
    
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { email, profilePicture }, { new: true });
        
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};







// logout
let logout = async (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send('Logged out successfully');
};



export { loginuser, registeruser,alluserdata,logout,authenticator,deleteUser,updateUser };
