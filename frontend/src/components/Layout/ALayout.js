import React from 'react'
import ASidebar from '../Sidebar/ASidebar'
import Header from '../Header/Header'
import './Layout.css'

const ALayout = ({ title, children }) => {
  return (
    <div className='layout-container'>
      <ASidebar />
      <div className='main-content'>
      <Header title={title} />
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default ALayout