const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const {Server} = require('socket.io');

const server = http.createServer(app);

const io = new Server(server ,  {
  connectionStateRecovery: {}
});

io.on('connection',(socket)=>{
    console.log("A user connected");
    socket.on('disconnect',()=>{
        console.log("A user disconnected");
    })
    socket.on('chat message' , (msg)=>{
        io.emit('chat message' , msg);
    })
})

app.get("/" , (req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

server.listen("3000",()=>{
    console.log("Server has started running");
})