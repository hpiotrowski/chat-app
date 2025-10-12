'use client'
import LoginButton from "@/components/LoginButton";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
const socket = io("http://localhost:4000");

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Połączono z socketem:', socket.id);
    });
  
    socket.on('receive-message', (msg) => {
      console.log('📩 Wiadomość odebrana:', msg);
      setLastMsg(msg)
    });
  
    return () => {
      socket.off('connect');
      socket.off('receive-message');
    };
  }, []);
  

  const [currentRoom,setCurrentRoom]=useState()
  const [lastMsg,setLastMsg]=useState('default')
  const [message,setMessage]=useState()


  function join(room_id) {
    if (socket.connected) {
      setCurrentRoom(room_id)
      console.log(`Wysyłam join-room: ${room_id}`);
      socket.emit('join-room', room_id);
      setCurrentRoom(room_id);
    } else {
      console.log('Socket jeszcze nie połączony');
    }

  }

  function sendTest(){
    socket.emit('send-message',1,"123")
  }
  function handleSubmit(e){
    console.log('submitted')
    e.preventDefault();
    socket.emit('send-message',currentRoom,message);
    setMessage("")
  }
  return (
<>
<div className="flex justify-between w-1/2 items-center">
  <button className="rounded border border-blue-400 hover:cursor-pointer" onClick={()=>join(1)}>room1</button>
  <button className="rounded border border-blue-400 hover:cursor-pointer" onClick={()=>join(2)}>room2</button>
  <button className="rounded border border-blue-400 hover:cursor-pointer" onClick={()=>sendTest()}>room2</button>

  <div>{lastMsg}</div>
</div>
<form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Wpisz wiadomość..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />
      <button type="submit" className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600">
        Wyślij
      </button>
    </form>
    {!isAuthenticated ? <LoginButton></LoginButton> : <div>Witaj {user.name}</div>}
</>

  );
}
