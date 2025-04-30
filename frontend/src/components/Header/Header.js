import React from 'react'
import Logo from '../../assets/logoSiguro.png'
import './Header.css'

const Header = ({ title }) => {

  return (
    <header className='header-component'>
        <div className='logo-title'>
          <img src={Logo} alt='Logo' /> 
          <h1>Libsync - {title}</h1>
        </div>
    </header>
  )
}

export default Header