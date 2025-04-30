import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
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
          <li className='sidebar-item'>
            <NavLink to="/login" className={({isActive}) => (isActive ? 'active' : '')}>
              Logout
            </NavLink>
          </li>
        </ul>
      </aside>
    </main>
  )
}

export default Sidebar