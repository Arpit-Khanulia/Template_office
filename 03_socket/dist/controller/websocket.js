"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usewebsocket = void 0;
const ws_1 = __importDefault(require("ws"));
const uuid_1 = require("uuid");
const usewebsocket = () => {
    // Create a WebSocket server on port 7071
    const wss = new ws_1.default.Server({ port: 7071 });
    // Store clients with their metadata
    const clients = new Map();
    // Event listener for new connections to the WebSocket server
    wss.on('connection', (ws) => {
        // Generate a unique ID and a random color for the client
        const id = (0, uuid_1.v4)();
        const color = Math.floor(Math.random() * 360);
        const metadata = { id, color };
        // Store the client's WebSocket connection and metadata
        clients.set(ws, metadata);
        // Event listener for messages from the client
        ws.on('message', (message) => {
            console.log(`Received message from ${metadata.id}: ${message}`);
            // Broadcast the message to all clients except the sender
            for (const [client, clientMetadata] of clients.entries()) {
                if (client !== ws) { // Don't send the message back to the sender
                    client.send(`User ${metadata.id} says: ${message}`);
                }
            }
        });
        // Optionally, you can send a message to the client after connection
        ws.send('Welcome to the WebSocket server!');
    });
    console.log('WebSocket server is running on ws://localhost:7071');
};
exports.usewebsocket = usewebsocket;
