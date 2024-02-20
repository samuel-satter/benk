import "./login.scss"
import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window"
import { useNavigate, Link } from 'react-router-dom';

interface LoginProps{}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]  = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const jwt = await invoke('login', { email, password });
      if(typeof jwt === 'string') {
        localStorage.setItem('jwt', jwt)
        const isAdmin = await invoke('is_admin', { email })

        if(isAdmin) {
          navigate('/admin');
        } else {
          navigate('/user')
        }
        await appWindow.maximize();
        await appWindow.setFullscreen(true);       
      } else {
        throw new Error('JWT is not a string');
      }  

    } catch (error) {
      const err = error as Error;
      setMessage(`Error loggin in: ${err.message}`);
      console.log(`${err.message}`, message);
    }
  }
  //   try {
  //     const isAdmin = await invoke('login', { email, password });
  //     setMessage('logged in successfully: ${result}');
  //     if(isAdmin) {
  //       navigate('/admin');
  //     } else {
  //       navigate('/user');
  //     }
  //   } catch (error) {
  //     const err = error as Error
  //     setMessage(`error logging in: ${err.message}`);
  //     console.log(`${err.message}`, message);
  //   }
  // };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
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
      <button className="link-btn" type="submit">Login</button>
      </form>
      <Link to="forgot-password" className="">Forgot Password</Link>
      <br />
      <Link to="create-account" className="">Create Account</Link>
      {message && <p>{message}</p>}
    </div>
  );

  useEffect(() => {
    console.log('Login component mounted');
    return () => {
      console.log('Login component unmounted');
    };
  }, []);
};
   
export default Login;