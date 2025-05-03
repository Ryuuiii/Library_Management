import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [loginData, setLoginData] = useState({
    loginID: '',
    password: ''
  });

  // ✅ Define handleChange correctly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('http://localhost/frontend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        if (data.role === 'admin') {
          navigate('/dashboard');
        } else if (data.role === 'borrower') {
          navigate('/borrower-dashboard');
        } else {
          setLoginError('Unknown role.');
        }
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setLoginError('Server error. Try again later.');
    }
  };

  return (
    <main className='login-page'>
      <div className='login-container'>
        <h2>Libsync Login</h2>
        <form className='login-form' onSubmit={handleLogin}>
          <label>ID Number:</label>
          <input 
            type="text" 
            name="loginID"
            required 
            placeholder='Enter Your ID Number' 
            value={loginData.loginID}
            onChange={handleChange} // ✅ Now this is defined
          />
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            required 
            placeholder='Enter Your Password' 
            value={loginData.password}
            onChange={handleChange} // ✅ Now this is defined
          />
          <button className='login-button' type='submit'>LOGIN</button>
          {loginError && <p className='error-message'>{loginError}</p>}
        </form>
      </div>
    </main>
  );
};

export default Login;
