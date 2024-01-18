"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const path = require('path');
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server);
io.on('connection', (s) => {
    s.on('message', (m) => {
        console.log(m);
        io.emit('msg', m);
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/view/index.html'));
});
server.listen(3000, () => { console.log('server running at port 3000'); });
