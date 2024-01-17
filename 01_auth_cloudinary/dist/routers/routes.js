"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const functionality_1 = require("../Controllers/functionality");
const imageuploadmulter_1 = require("../Helper/imageuploadmulter");
const imageuploadcloudinary_1 = require("../Helper/imageuploadcloudinary");
const router = express_1.default.Router();
router.put('/user/:id', functionality_1.authenticator, functionality_1.updateUser)
    .delete('/user/:id', functionality_1.authenticator, functionality_1.deleteUser)
    .get('/logout', functionality_1.logout)
    .get('/alluserdata', functionality_1.authenticator, functionality_1.alluserdata)
    .post('/login', functionality_1.loginuser)
    .post('/register', functionality_1.registeruser)
    .post('/uploadimage', imageuploadmulter_1.upload.single('image'), imageuploadcloudinary_1.uploadImage);
exports.default = router;
