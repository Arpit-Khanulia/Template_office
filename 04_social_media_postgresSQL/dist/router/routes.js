"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const crud_1 = require("../controller/crud");
const router = express_1.default.Router();
exports.router = router;
router
    .get('/', crud_1.home)
    .get('/viewpost', auth_1.checkAuth, crud_1.viewpost)
    .get('/viewcomment', auth_1.checkAuth, crud_1.viewcomment)
    .get('/userprofile', auth_1.checkAuth, crud_1.userprofile)
    .post('/register', crud_1.register)
    .post('/login', crud_1.login)
    .post('/post', auth_1.checkAuth, crud_1.createpost)
    .post('/post/comment', auth_1.checkAuth, crud_1.createcomment)
    .post('/image', auth_1.checkAuth, crud_1.imageupload);
