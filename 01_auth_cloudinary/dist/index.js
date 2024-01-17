"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_js_1 = __importDefault(require("./routers/routes.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// database connection
const database_js_1 = require("./Models/database.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/', routes_js_1.default);
(0, database_js_1.connectToDatabase)();
// server listening
app.listen(3000, () => {
    console.log('server is running at port 3000');
});
