import express from 'express'
import {checkAuth} from '../middleware/auth';
import {home, viewcomment,viewpost,userprofile,createpost, register,login,imageupload,createcomment } from '../controller/crud';

const router = express.Router();


router
.get('/',home)
.get('/viewpost',checkAuth,viewpost)
.get('/viewcomment',checkAuth,viewcomment)
.get('/userprofile',checkAuth,userprofile)
.post('/register',register)
.post('/login',login)
.post('/post',checkAuth,createpost)
.post('/post/comment',checkAuth,createcomment)
.post('/image',checkAuth,imageupload)



export {router};