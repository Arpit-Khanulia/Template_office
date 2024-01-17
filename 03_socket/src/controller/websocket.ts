import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import {Request,Response} from 'express';



const usewebsocket = ()=>{

    // Create a WebSocket server on port 7071
    const wss = new WebSocket.Server({ port: 7071 });
    
    // Store clients with their metadata
    const clients = new Map();
    
    // Event listener for new connections to the WebSocket server
    wss.on('connection', (ws) => {
        // Generate a unique ID and a random color for the client
        const id = uuidv4();
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


}


export {usewebsocket};