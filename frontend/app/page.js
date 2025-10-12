'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export default function Home() {

  useEffect(() => {
    
    socket.on('connect', () => {
      console.log(' Połączono z socketem:', socket.id);
    });

    

    return () => {
      socket.off('connect');
      socket.off('joined-room');
    };
  }, []);

  const [currentRoom,setCurrentRoom]=useState()


  function join(room_id) {
    if (socket.connected) {
      console.log(`Wysyłam join-room: ${room_id}`);
      socket.emit('join-room', room_id);
      setCurrentRoom(room_id);
    } else {
      console.log('Socket jeszcze nie połączony');
    }
  }




  return (

<div className="flex justify-between w-1/2 items-center">
  <button className="rounded border border-blue-400 hover:cursor-pointer" onClick={()=>join(1)}>room1</button>
  <button className="rounded border border-blue-400 hover:cursor-pointer" onClick={()=>join(2)}>room2</button>

 



</div>
  );
}
