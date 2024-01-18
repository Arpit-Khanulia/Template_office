import express from 'express'
import http from 'http';
import socketio from 'socket.io';
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = new socketio.Server(server);



io.on('connection',(s)=>{


    
    s.on('message', (m) => {
        
        console.log(m);
        
        io.emit('msg', m);
        

    });
    
    
    
})




app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, '../src/view/index.html'));
  });


server.listen(3000,()=>{console.log('server running at port 3000')})

