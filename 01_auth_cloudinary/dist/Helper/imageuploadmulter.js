"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Set up multer storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images'); // Specify the directory where the files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;