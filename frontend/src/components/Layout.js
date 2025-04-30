import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import '../index.css' //Para sa Global Styles
const Layout = ({ title, children }) => {

  return (
    <div className='layout-container'>
      <Sidebar />
      <div className='main-content'>
      <Header title={title} />
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default Layout