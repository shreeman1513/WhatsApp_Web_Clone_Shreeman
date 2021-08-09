import React, {useState} from 'react'
import "./App.css"
import Sidebar from "./Sidebar"
import Chat from "./Chat" 
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom';
import Login from './Login'
import {LoginContext} from './LoginContext'

function App() {
  const [user,setuser] = useState(null);
  return (
    <LoginContext.Provider value={{user,setuser}}>
      {!(user)?(<Login />):(
      <div class="app">
      <div class="app_body">
        <Router>
        <Sidebar/>
        <Switch>
          <Route path="/rooms/:roomId" component={Chat}/>
        <Route path="/" component={Chat}/>
        </Switch>
        </Router>
      </div>
    </div>
    )}
    </LoginContext.Provider>
    
   
  )
}

export default App

