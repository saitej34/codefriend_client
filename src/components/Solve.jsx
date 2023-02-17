import './App.css';
import {useState,useEffect} from 'react';
import io from 'socket.io-client';

const socket = io("https://cserve.up.railway.app")


function Solve() {
  const [message,setmessage] = useState('');
  const [chat,setchat] = useState([]);
  const [nam,setnam] = useState('');
  const send = (e)=>{
     e.preventDefault();
     socket.emit("chat",{message:message,name:nam});
     setmessage('');
  }
  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setchat([...chat,payload])
    })
})
  return (
    <div className="App">
      <header className="App-header">
          <h1>Chat App</h1>
          <input type="text" placeholder="name" onChange={(e)=>{setnam(e.target.value)}}/>
          {chat.map((pay,index)=>{
            return <p key="index">{pay.message} : {pay.name}</p>
          })}

          <form onSubmit={send}>
            <input type="text" name="chat" placeholder="send text" value={message} onChange={(e)=>{setmessage(e.target.value)}}/>
            <button type="submit">Send</button>
          </form>
      </header>
    </div>
  );
}

export default Solve;