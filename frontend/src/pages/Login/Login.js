import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [loginData, setLoginData] = useState({
    loginID: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    //TODO: Request POST to the Backend para potang login
    //Tignan yung Role ng user kung admin ba o borrower 
    // kapag borrower sa borrower-dashboard siya kapag admin sa dashboard lang
    try {
      
    } catch (err) {
      console.log(err)
      setLoginError('Server error. Try again later.')
    }
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
            value={loginData.loginID}
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
            value={loginData.password}
            onChange={handleChange}
          />

          <button className='login-button' type='submit'>LOGIN</button>
          {loginError && <p className='error-message'>{loginError}</p>}
        </form>
        
      </div>
    </main>
  )
}

export default Login