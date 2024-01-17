"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/../../.env' });
const checkAuth = (req, res, next) => {
    const authToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!authToken || !refreshToken) {
        return res.status(401).json({ message: " Authentication Failed : No authToken or refreshToken is provided " });
    }
    jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET_KEY, (err, decode) => {
        // expired
        if (err) {
            console.log("error in auth verification ");
            jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (refreshErr, refreshDecode) => {
                // refresh token is expired
                if (refreshErr) {
                    return res.status(401).json({ message: " Authentication Failed : Both tokens are invalid" });
                }
                // not expired 
                else {
                    const newAuthToken = jsonwebtoken_1.default.sign({ id: refreshDecode.id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
                    const newRefreshToken = jsonwebtoken_1.default.sign({ id: refreshDecode.id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '2h' });
                    res.cookie('accessToken', newAuthToken, { httpOnly: true });
                    res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
                    req.id = refreshDecode.id;
                    next();
                }
            });
        }
        // not expired
        else {
            req.id = decode.id;
            // console.log(decode.userId) ;
            next();
        }
    });
};
exports.checkAuth = checkAuth;
