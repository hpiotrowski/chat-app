const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // frontend
      methods: ["GET", "POST"]
    }
  });

rooms_ids=[1,2,3,4]
app.get('/hello',(req,res)=>{
    res.send("czesc")

})



io.on('connection',(socket)=>{
    console.log("connected user")
    console.log('aktualnie połączonych:', io.engine.clientsCount);
    socket.on('join-room',(room_id)=>{
        socket.join(room_id)
        console.log(`polaczono z pokojem ${room_id}`)
    })
    socket.on('send-message',(room_id,message)=>{
        io.in(room_id).emit('receive-message',message)
    })
})




server.listen(4000, () => {
    console.log('listening on *:4000');
  });