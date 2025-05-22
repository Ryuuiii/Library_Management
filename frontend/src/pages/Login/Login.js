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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
  
    console.log("Login data being sent:", loginData);
  
    try {
      const response = await fetch('http://localhost/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });
  
      const data = await response.json();
      console.log("Response data:", data);
  
      if (response.ok) {
        const role = data.role?.toLowerCase();
  
        if (role === 'admin') {
  localStorage.setItem('userRole', role);
  localStorage.setItem('loginID', data.loginID); // ✅ Store loginID
  navigate('/admin/profile');
} else if (role === 'borrower') {
  localStorage.setItem('userRole', role);
  localStorage.setItem('loginID', data.loginID); // ✅ Store loginID
  navigate('/borrower/profile');
          } else {
          setLoginError('Unknown role.');
        }
      } else {
        if (response.status === 400) {
          setLoginError('Invalid input. Please check your ID and password.');
        } else if (response.status === 401) {
          setLoginError('Incorrect ID or password.');
        } else if (response.status === 500) {
          setLoginError('Server error. Please try again later.');
        } else {
          setLoginError(data.error || 'An unexpected error occurred.');
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setLoginError('Unable to connect to the server. Please check your internet connection or try again later.');
    } finally {
      setIsLoading(false);
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
            onChange={handleChange}
          />
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            required 
            placeholder='Enter Your Password' 
            value={loginData.password}
            onChange={handleChange}
          />
          <button className='login-button' type='submit'>LOGIN</button>
          {isLoading && <p>Loading...</p>}
          {loginError && <p className='error-message'>{loginError}</p>}
        </form>
      </div>
    </main>
  );
};

export default Login;
