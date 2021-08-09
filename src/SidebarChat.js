import { Avatar } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import "./SidebarChat.css" 
import db from './firebase'
import {Link} from 'react-router-dom'

function SidebarChat({addNewChat,id,name,key}) {
    const [seed, setSeed] = useState("abcdef");
    useEffect (
      () => {setSeed(Math.random()*2955)} , []
        );
    const [messages,setmessages]=useState([]);
        useEffect(()=>{
            if(id){
                db.collection('rooms').doc(id).collection('messages').orderBy('time','desc').onSnapshot((snapshot)=>setmessages(snapshot.docs.map(doc=>doc.data())));
            }
        },[id]);
       
    function createchat(){
        const roomname = prompt("enter a room name:")
        db.collection('rooms').add({room:roomname})
    }    

    return !addNewChat?(
        
        <Link to= {`/rooms/${id}`}>

<div class="SidebarChat">
          
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div class="SidebarChatDetail">
              <h3>{name}</h3>
              <p>{messages[0]?.msg}</p>
          </div>
          </div>
        </Link>            


           
    ):(
        <div class="SidebarChat" onClick={createchat}>
            <h2>AddNewChat</h2>
        </div>
    )

    }
export default SidebarChat
    
