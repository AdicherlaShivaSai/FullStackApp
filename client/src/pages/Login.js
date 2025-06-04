import React from 'react'
import { useState , useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { AuthContext } from '../helpers/AuthContext.js'; // Import AuthContext if needed

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthState } = useContext(AuthContext); // Use AuthContext to update auth state if needed

    const handleLogin = () => {
        const data = {
            username: username,
            password: password
        };
        axios.post('http://localhost:3001/auth/login', data).then((response) => {
          if(response.data.error) alert(response.data.error);
          else{
          localStorage.setItem('accessToken', response.data.accessToken);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true
          });
          // console.log(response.data);
          navigate('/')}; // Redirect to home page after successful login
    })}

  return (
    
    <div className='loginContainer'>
      <h1>Login</h1>
      <p>Please enter your credentials to log in.</p>
      <input 
        type="text" 
        onChange={(event)=>{
        setUsername(event.target.value);
        }} 
        placeholder="Username" 
        />

      <input 
        type="password" 
        onChange={(event)=>{
        setPassword(event.target.value);
        }}
        placeholder="Password" 
        /> 
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
