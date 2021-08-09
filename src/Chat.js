import { Avatar, IconButton } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import "./Chat.css"
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router';
import db from './firebase'
import {LoginContext} from "./LoginContext";
import {useContext} from'react';
import firebase from 'firebase';
function Chat() {
    
    const [seed, setSeed] = useState("abcdef");
    const [input,setInput]=useState("")
    const [messages,setmessages] = useState([]);
    const {user}=useContext(LoginContext);
    const sendMessage =(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add(
            {
                msg:input,
                user:user.displayName,
                time:firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        document.getElementById('inputer').value="";
        setInput("");
    }
    useEffect (
      () => {setSeed(Math.random()*2955)} , []
        );

    function storemessage(){
        setInput(document.getElementById("inputer").value);
        console.log(input);
    }

    const {roomId} = useParams();
    const [roomname,setroomname] = useState("");
    useEffect(()=>{
        if(roomId){
            console.log(roomId);
            db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>setroomname(snapshot.data().room));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('time','asc').onSnapshot((snapshot)=>setmessages(snapshot.docs.map(doc=>doc.data())));
        }
    },[roomId]);
    return (
        <div class="chat">
            <div class="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            
                <div class="chat_header_info">
                        <h3>{roomname}</h3>
                        <p>Last seen at...</p>
                </div>
                <div class="chat_header_right">
                    <IconButton>
                <SearchIcon/>
                </IconButton>
                <IconButton>
                <AttachFileIcon/>
                </IconButton>
                <IconButton>
                <MoreVertIcon/>
                </IconButton>

                </div>



            </div>
            <div class="chat_body">
                  { messages.map((message)=>
                    <p className={`chat_message ${user.displayName===message.user && 'chat_message_receiver'}`}>
                    <span className="chat_name">{message.user} </span>
                    {message.msg}
                    <span className="chat_time">
                    {new Date(message.time?.toDate()).toUTCString()}
                    </span>
                    </p>
                  )
                      
                  }
                
                    
                </div>
            <div class="chat_footer">
                <IconButton>
            <InsertEmoticonIcon/> 
            </IconButton>
            <form>
            <input class="footer_text" type="text" placeholder="Type a message.." id="inputer" onChange={storemessage}/>
            <button onClick={sendMessage}>Send</button>
            </form>
           
            
            <MicIcon/>
           

            </div>

            </div>
     
                
                
    )
}

export default Chat
