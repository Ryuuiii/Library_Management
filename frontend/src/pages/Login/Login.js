import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [loginID, setLoginID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'loginID') setLoginID(value);
    if (name === 'password') setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setError('');
    try {
      // Sending POST request with LoginID and Password
      const response = await axios.post(
        'http://localhost/library-backend/login.php',
        {
          loginID: loginID,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      // Check the response properly
      if (response.data.role) {
        alert(`Login successful! Welcome, ${response.data.role}`);
        // Conditional Navigation based on user role
        if (response.data.role === 'Administrator') {
          navigate('/dashboard'); // Navigate to Admin Dashboard
        } else {
          navigate('/borrower-dashboard'); // Navigate to Borrower Dashboard
        }
      } else {
        setError('Role not found in the response');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

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
            value={loginID}
            onChange={handleChange}
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
            value={password}
            onChange={handleChange}
          />

          <button className='login-button' type='submit'>LOGIN</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        </form>
        
      </div>
    </main>
  )
}

export default Login