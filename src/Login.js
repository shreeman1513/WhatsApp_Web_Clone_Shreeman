import React,{useContext} from 'react'
import {auth,provider} from './firebase'
import {LoginContext} from './LoginContext'
import "./Login.css"

function Login() {
    const {setuser} = useContext(LoginContext)
    function signIn(){
        auth.signInWithPopup(provider).then(result=>setuser(result.user)).catch(e=>console.log(e));


    }
    return (
        <div class="login">
            
            <div class="login_body">
            
           
            <h1>Sign in to WhatsApp</h1>
        
    
            <button placeholder="Login" onClick={signIn}>LOGIN</button> 
            </div>
        </div>
        
    )
}

export default Login;
