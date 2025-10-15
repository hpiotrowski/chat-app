'use client'
import LoginButton from "@/components/LoginButton";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

let socket=null;
export default function Home() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

 

  useEffect(() => {
    console.log('useEffect start, isAuthenticated:', isAuthenticated);//debug
  
    const handleConnect = async () => {
      if (!isAuthenticated) return;
  
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:4000/api"
          }
        });
  
        console.log("token:", token);
  
        socket = io("http://localhost:4000", {
          auth: { token }
        });
  
        socket.on('connect', () => {
          console.log('Połączono z socketem:', socket.id);
        });
  
        socket.on('receive-message', (msg) => {
          console.log('Wiadomość odebrana:', msg);
          setLastMsg(msg);
        });
      } catch (error) {
        console.error('Błąd podczas łączenia z socketem:', error);
      }
    };
  
    handleConnect();
  
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('receive-message');
        socket.disconnect();
      }
    };
  }, [isAuthenticated, getAccessTokenSilently]);

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
    if(socket.connected){
    console.log('submitted')
    e.preventDefault();
    socket.emit('send-message',currentRoom,message);
    setMessage("")
    }
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
    <LogoutButton></LogoutButton>
    <Button variant="outline">Button</Button>
    <ThemeToggle></ThemeToggle>
</>

  );
}
