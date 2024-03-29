"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_connection_1 = require("./model/database_connection");
const routes_1 = require("./router/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/', routes_1.router);
(0, database_connection_1.databaseConnection)();
app.listen(3000, () => console.log('server listening at port : 3000'));
