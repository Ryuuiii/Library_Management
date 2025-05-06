import React from 'react'
import BSidebar from '../Sidebar/BSidebar'
import Header from '../Header/Header'
import './Layout.css'

const ALayout = ({ title, children }) => {
  return (
    <div className='layout-container'>
      <BSidebar />
      <div className='main-content'>
      <Header title={title} />
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default ALayout