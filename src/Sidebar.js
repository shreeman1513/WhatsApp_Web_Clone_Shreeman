import { Avatar, IconButton } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import CommentIcon from '@material-ui/icons/Comment';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./Sidebar.css"  
import SearchIcon from '@material-ui/icons/Search';
import Search from '@material-ui/icons/Search';
import { AirlineSeatLegroomNormalSharp, SearchOutlined } from '@material-ui/icons';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from"./SidebarChat"
import db from './firebase';
import {LoginContext} from './LoginContext'
import {useContext} from 'react'



function Sidebar(){
    const {user} = useContext(LoginContext);
    const [rooms,setrooms]=useState([]);
    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot=>
            setrooms(snapshot.docs.map(
                (doc)=>{return  {id:doc.id,data:doc.data()}
                }
            )
        ))
        console.log(rooms);
    },[]);
    return (
            <div class="Sidebar">
              <div class="Sidebar_header">
                <Avatar src={user.photoURL}/>
                <div class="Sidebar_header_right">
                    <IconButton>
                         <CommentIcon/>
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                         <MoreVertIcon/>
                    </IconButton>
                </div>
              </div>
              <div class="Sidebar_search">
                  <div class="Sidebar_search_container">
                  <SearchOutlinedIcon/>
              <input class="search" type="text" placeholder="Search or start new chat"></input> 
              

                  </div>
              
              </div>

              <div class="Sidebar_chat">
                   <SidebarChat addNewChat/>
                   {rooms.map(
                       room=><SidebarChat key={room.id} id={room.id} name={room.data.room} />
                    )}
              </div>

            </div>
    
    )
}

export default Sidebar
