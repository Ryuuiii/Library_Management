import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    
    // Add Authentication Logic 
    
    //If login is successful, redirect to dashboard
    navigate('/dashboard');
  }

  return (
    <main className='login-page'>
      <div className='login-container'>
        <h2>Libsync Login</h2>
        <form action="" className='login-form'>
          <label for="email">
            ID Number:
          </label>
          <input type="number" id="number" name="number" required placeholder='Enter Your ID Number' />
          <label for="">
            Password:
          </label>
          <input type="password" id="password" name="password" required placeholder='Enter Your Password' />

          <button className='login-button' type='submit' onClick={handleLogin}>LOGIN</button>
        </form>
        
      </div>
    </main>
  )
}

export default Login