import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    navigate('/dashboard')
  }

  return (
    <main className='login-page'>
      <div className='login-container'>
        <h2>Libsync Login</h2>
        <form className='login-form' onSubmit={handleLogin}>
          <label>
            ID Number:
          </label>
          <input 
            type="text" 
            name="loginID"
            id='loginID' 
            required 
            placeholder='Enter Your ID Number' 
            />
          <label>
            Password:
          </label>
          <input 
            type="password" 
            name="password" 
            id='password'
            required 
            placeholder='Enter Your Password' 
          />

          <button className='login-button' type='submit'>LOGIN</button>
        </form>
        
      </div>
    </main>
  )
}

export default Login