import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import Logout from '../Logout/Logout'

const ASidebar = () => {
  const [isLogout, setIsLogout] = useState(false)


  return (
    <main className='sidebar-component'>
      <aside className='sidebar-container'>
        <ul>
          <li className='sidebar-item'>
            <NavLink to="/dashboard" className={({isActive}) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink to="/books" className={({isActive}) => (isActive ? 'active' : '')}>
              Book Management
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink to="/borrower" className={({isActive}) => (isActive ? 'active' : '')}>
              Borrower Management
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink to="/transactions" className={({isActive}) => (isActive ? 'active' : '')}>
              Transactions
            </NavLink>
          </li>
          <li className='sidebar-item' onClick={() => setIsLogout(true)}>
            <a>Logout</a>
          </li>
        </ul>
      </aside>

      {isLogout && (
        <Logout onClose={() => setIsLogout(false)}/>
      )}
    </main>
  )
}

export default ASidebar