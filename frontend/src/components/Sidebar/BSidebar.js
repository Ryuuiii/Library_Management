import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../Logout/Logout'
import './Sidebar.css'

const BSidebar = () => {
  const [isLogout, setIsLogout] = useState(false)
  
  return (
    <main className='sidebar-component'>
      <aside className='sidebar-container'>
        <ul>
          <li className='sidebar-item'>
            <NavLink to="/borrower/profile" className={({isActive}) => (isActive ? 'active' : '')}>
              Profile
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink to="/borrower/books" className={({isActive}) => (isActive ? 'active' : '')}>
<<<<<<< HEAD
              Book Catalog
=======
              Book Catalogue
>>>>>>> 3efe4c640a1f82a3cbe5c79bd8164a7618fd98a0
            </NavLink>
          </li>
          
          <li className='sidebar-item'>
            <NavLink to="/borrower/notification" className={({isActive}) => (isActive ? 'active' : '')}>
              Notification
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

export default BSidebar