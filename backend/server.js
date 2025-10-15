const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
require('dotenv').config();
const { createRemoteJWKSet, jwtVerify } = require('jose');
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // frontend
      methods: ["GET", "POST"]
    }
  });


const ISSUER = process.env.AUTH0_ISSUER || 'https://dev-du3sht0fwpp1csv1.us.auth0.com/';
const AUDIENCE = process.env.AUTH0_AUDIENCE || 'http://localhost:4000/api';
const JWKS = createRemoteJWKSet(new URL(ISSUER + '.well-known/jwks.json'));

io.use(async (socket, next) => {
  try {
    const raw = socket.handshake.auth && socket.handshake.auth.token;
    const token = typeof raw === 'string' ? raw.replace(/^Bearer\s+/i, '') : null;
    if (!token) return next(new Error('Unauthorized'));

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    socket.user = { sub: payload.sub, name: payload.name, email: payload.email };
    return next();
  } catch (e) {
    console.error('JWT verify error:', e.message);
    return next(new Error('Unauthorized'));
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




const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
  });