'use client'
import LoginButton from "@/components/LoginButton";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

let socket=null;
import { MainLayout } from "@/components/layout/MainLayout";

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
  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => join(1)}>Room 1</Button>
          <Button onClick={() => join(2)}>Room 2</Button>
          <Button onClick={sendTest}>Test Message</Button>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p>{lastMsg}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-md border bg-background px-3 py-2"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </MainLayout>
  );
}
