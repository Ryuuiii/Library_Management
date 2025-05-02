import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'


const BorrowerDashboard = () => {
  return (
    <Layout>
      <h2>Welcome, Borrower!</h2>
      <button className='logout-btn'><Link to='/login'>Logout</Link></button>
    </Layout>
  )
}

export default BorrowerDashboard