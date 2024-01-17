"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'di4jyusxf',
    api_key: '577412118699267',
    api_secret: 'HiVzZCHnGAWFvnR2-AROJ4wF1rw'
});
let uploadImage = async (req, res) => {
    try {
        if (req.file) {
            console.log(req.file.path);
            const result = await cloudinary_1.v2.uploader.upload(req.file.path);
            console.log(result);
            res.json({ url: result.secure_url });
        }
        else {
            res.status(400).json({ message: "No file provided" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Image upload failed" });
    }
};
exports.uploadImage = uploadImage;
