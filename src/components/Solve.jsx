import {useState,useEffect} from 'react';
import io from 'socket.io-client';
import '../App.css'
import './solve.css'
const socket = io("https://cserve.up.railway.app")


function Solve() {
  var time;
  var msgtime = ()=>{
    var date = new Date();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  time = hours + ":" + minutes + ":" + seconds;
  return time;
  }
  const gettime = ()=>{
  var date = new Date();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  time = hours + ":" + minutes + ":" + seconds;
  settime(time);
  }
  const [tim,settime] = useState();
  const [message,setmessage] = useState('');
  const [chat,setchat] = useState([]);
  const [nam,setnam] = useState('');
  const [user,setuser] = useState('');
  const [profilepic,setprofile] = useState('');
  const send = (e)=>{
     e.preventDefault();
     socket.emit("chat",{message:message,name:nam,time:tim});
     setmessage('');
  }
  useEffect(()=>{
    setInterval(gettime,1000);
    socket.on("chat",(payload)=>{
      setchat([...chat,payload])
    })
})
  return (
    <div>
        <div class="menu">
  
  <div class="back"><i class="fa fa-chevron-left"></i> <img src="data:image/png;base64,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" draggable="false"/></div>
    
  <div class="name">Open Chat</div>
    
  <div class="last">{tim}</div>
    
  </div>
  <ol class="chat">
        {chat.map((chat)=>{
             <li class="self">
                         <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
                         <div class="msg">
                         <p>{chat.message}</p>
                          <p>{chat.name}</p>
                            <time>{msgtime()}</time>
                          </div>
            </li>
        })}
  </ol>
  <input class="text" type="text" placeholder="Type here!" onChange={(e)=>{setmessage(e.target.value)}} />
  <input type="button" class="btns" value="Send" onClick={send} /> 
  <div class="emojis"></div>
    </div>
    
  );
}

export default Solve;

/* <div className="App">
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
    </div> */
  //   <li class="self">
  //             <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Hola!</p>
  //             <p>Te vienes a cenar al centro? <emoji class="pizza"/></p>
  //               <time>20:17</time>
  //             </div>
  //       </li>
  //       <li class="self">
  //             <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Puff...</p>
  //             <p>Aún estoy haciendo el contexto de Góngora... <emoji class="books"/></p>
  //             <p>Mejor otro día</p>
  //               <time>20:18</time>
  //             </div>
  //       </li>
  //       <li class="other">
  //             <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Qué contexto de Góngora? <emoji class="suffocated"/></p>
  //               <time>20:18</time>
  //             </div>
  //       </li>
  //       <li class="self">
  //             <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>El que mandó Marialu</p>
  //             <p>Es para mañana...</p>
  //             <time>20:18</time>
  //             </div>
  //       </li>
  //       <li class="other">
  //             <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p><emoji class="scream"/></p>
  //             <p>Pásamelo! <emoji class="please"/></p>
  //               <time>20:18</time>
  //             </div>
  //       </li>
  //       <li class="self">
  //             <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
  //             <div class="msg">
  //             <img src="http://i.imgur.com/QAROObc.jpg" draggable="false"/>
  //               <time>20:19</time>
  //             </div>
  //       </li>
  //       <li class="other">
  //             <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Gracias! <emoji class="hearth_blue"/></p>
  //               <time>20:20</time>
  //             </div>
  //       </li>
  // <div class="day">Hoy</div>
  //       <li class="self">
  //             <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Te apetece jugar a Minecraft?</p>
  //               <time>18:03</time>
  //             </div>
  //       </li>
  //       <li class="other">
  //             <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Venga va, hace ya mucho que no juego...</p>
  //               <time>18:07</time>
  //             </div>
  //       </li>
  //       <li class="self">
  //             <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Ehh, me crashea el Launcher... <emoji class="cryalot"/></p>
  //               <time>18:08</time>
  //             </div>
  //       </li>
  //       <li class="other">
  //             <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p><emoji class="lmao"/></p>
  //               <time>18:08</time>
  //             </div>
  //       </li>
  //       <li class="self">
  //             <div class="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Es broma</p>
  //             <p>Ataque Moai!</p>
  //             <p><span><emoji class="moai"/></span><span><emoji class="moai"/></span><span><emoji class="moai"/></span><span><emoji class="moai"/></span><span><emoji class="moai"/></span><span><emoji class="moai"/></span></p>
  //               <time>18:09</time>
  //             </div>
  //       </li>
  //       <li class="other">
  //             <div class="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
  //             <div class="msg">
  //             <p>Copón</p>
  //             <p><emoji class="funny"/></p>
  //               <time>18:08</time>
  //             </div>
  //       </li>