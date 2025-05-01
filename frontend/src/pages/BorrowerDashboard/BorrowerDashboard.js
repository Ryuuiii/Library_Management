import React from 'react'
import { Link } from 'react-router-dom'

const BorrowerDashboard = () => {
  return (
    <div>
      <h2>Welcome, Borrower!</h2>
      <button className='logout-btn'><Link to='/login'>Logout</Link></button>
    </div>
  )
}

export default BorrowerDashboard