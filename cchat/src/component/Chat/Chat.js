import React, { useEffect, useState } from 'react'
import{user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../image/closeIcon.png";

const ENDPOINT ="http://localhost:4500/";

let socket;

const Chat = () => {

  const [id, setid] = useState("");
  const [messages, setmessages] = useState([])
  const send=()=>{
    
    const message=document.getElementById("ChatInput").value;

    socket.emit('message',{message,id});
    document.getElementById("ChatInput").value="";

  }
  console.log(messages);
    useEffect(() => {
    socket=socketIo(ENDPOINT,{transports:['websocket']});

      socket.on('connect',()=>{
        setid(socket.id);
      })
      console.log(socket);
      socket.emit('joined', { user });

      socket.on('Welcome',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })

      socket.on('userJoined',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })
      socket.on('leave',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })


      return ()=>{
          
          socket.off();
      }
      
    }, [])
    useEffect(() => {
    
      socket.on('sendMessage',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message,data.id);
      })
    
      return () => {
        socket.off();
      }
    }, [messages])
    


  return (
    
    <div className='ChatPage'>
        
        <div className='ChatContainer'>
            <div className='Header'>
                <h2>C CHAT</h2>
                <a href="/">
                <img src={closeIcon} alt="close" /> </a>
            </div>

            <ReactScrollToBottom  className='ChatBox'>
              {messages.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
              
            </ReactScrollToBottom >

            <div className='InputBox'>
                
                <input onKeyPress={(event)=>event.key==='Enter'? send():null} type="text" id="ChatInput" />
                <button onClick={send} className='SendBtn'>Send</button>
            </div>
        </div>
        
    </div>
  )
}

export default Chat