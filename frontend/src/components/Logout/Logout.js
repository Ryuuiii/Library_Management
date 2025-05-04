import React from 'react'
import { IoMdClose } from "react-icons/io";
import './Logout.css'
import { useNavigate } from 'react-router-dom';

const Logout = ({onClose}) => {
  const navigate = useNavigate();


  const handleLogout = () => {
    
    //Clear user related data
    navigate('/login')
  }


  return (
    <div className='logout-modal'>
      <div className='logout-content'>
        <IoMdClose className="close-logout" onClick={onClose} />
        <h2>Are you sure you want to logout?</h2>

        <div className='buttons'>
          <button className='cancel'onClick={onClose}>Cancel</button>
          <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Logout