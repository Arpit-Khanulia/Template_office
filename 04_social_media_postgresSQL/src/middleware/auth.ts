import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request,Response ,NextFunction} from 'express';





dotenv.config({ path: __dirname+'/../../.env' });

export const checkAuth = (req:any,res:any,next:any) => {
    const authToken = req.cookies.accessToken ;
    const refreshToken = req.cookies.refreshToken ;
    if(!authToken || !refreshToken){
        return res.status(401).json({message : " Authentication Failed : No authToken or refreshToken is provided "})
    }

    jwt.verify(authToken,process.env.JWT_SECRET_KEY!,(err:any,decode:any)=> {
        // expired
        if(err){
            console.log("error in auth verification ") ;
            jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY!,(refreshErr:any,refreshDecode:any) => {
                // refresh token is expired
                if(refreshErr){
                    return res.status(401).json({message : " Authentication Failed : Both tokens are invalid"}) ;
                }
                // not expired 
                else{
                    const newAuthToken = jwt.sign({id : refreshDecode.id},process.env.JWT_SECRET_KEY!,{expiresIn : '30m'});
                    const newRefreshToken = jwt.sign({id : refreshDecode.id},process.env.JWT_REFRESH_SECRET_KEY!,{expiresIn : '2h'})

                    res.cookie('accessToken',newAuthToken,{httpOnly : true }) ;
                    res.cookie('refreshToken',newRefreshToken,{httpOnly : true }) ;
                    req.id = refreshDecode.id ;
                    next() ;
                }
            })
        }
        // not expired
        else{
            req.id = decode.id ;
            // console.log(decode.userId) ;
            next() ;
        }
    })
}