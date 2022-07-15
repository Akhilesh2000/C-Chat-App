import React, { useState } from 'react';
import "./Join.css";
import {Link} from 'react-router-dom';
import logo from "../../image/logo.png";

let user;


const Join = () => {
  const sendUser=()=>{
    user=document.getElementById('JoinInput').value;
    document.getElementById('JoinInput').value="";
  }
  const [name,setname] = useState("");
  
  return (
    
    <div className="JoinPage">
        <div className='JoinContainer'>
            <img src={logo} alt="logo"/>
            <h1>C Chat </h1>
            <input onChange={(e)=>setname (e.target.value)} placeholder='Enter User-ID' type="text" id="JoinInput"/>
            <Link onClick={(event)=>!name?event.preventDefault():null} to="/chat"><button onClick={sendUser} className='JoinBtn'>Log in</button></Link>
        </div>
    </div>
  )
}

export default Join
export {user}