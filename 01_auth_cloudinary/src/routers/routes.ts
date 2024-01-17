import express , { Request,Response} from "express";
import { loginuser, registeruser,alluserdata,authenticator,logout,deleteUser,updateUser } from '../Controllers/functionality';
import {upload} from "../Helper/imageuploadmulter";
import { uploadImage } from "../Helper/imageuploadcloudinary";


const router = express.Router();





router.put('/user/:id',authenticator,updateUser)
.delete('/user/:id',authenticator,deleteUser)
.get('/logout',logout)
.get('/alluserdata',authenticator,alluserdata)
.post('/login',loginuser)
.post('/register',registeruser)
.post('/uploadimage', upload.single('image'), uploadImage);







export default router;  