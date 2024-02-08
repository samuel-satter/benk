import "./login.scss"
import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useNavigate } from 'react-router-dom';

interface LoginProps{}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]  = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const isAdmin = await invoke('login', { email, password });
      setMessage('logged in successfully: ${result}');
      if(isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      setMessage('error logging in: ${error.message}');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>
      <input type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)} 
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
   
export default Login;