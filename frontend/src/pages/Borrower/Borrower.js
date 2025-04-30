import React from 'react'
import Layout from '../../components/Layout'
import Table from '../../components/Table/Table';
import { IoMdSearch } from "react-icons/io";
import './Borrower.css'

const borrowerColumns = [ 'Borrower ID', 'Name', 'Email Address', 'Borrower Type ID', 'Department ID' ,'Year Level' ]

const Borrower = () => {
  
  return (
    <Layout title='Borrower Management'>
      <div className='borrower-content'>
      <header className='borrower-header'>
          <div className='borrower-filter'>
            <div className='search-bar'>
              <input type="search" placeholder='Search by name or ID . . . . . . .' />
              <IoMdSearch className='search-icon'/>
            </div>
            
            <select className='type'>
              <option value="">Select Type</option>
              <option value="all">All Types</option>
              <option value="1">Student</option>
              <option value="2">Faculty</option>
            </select>

            <select className='status'>
              <option value="">Select Status</option>
              <option value="all">All Status</option>
              <option value="1">Active</option>
              <option value="2">Deactive</option>
            </select>
          </div>

          <div className='buttons'>
          </div>
        </header>

        <Table columns={borrowerColumns}/>

      </div>
    </Layout>
  )
}

export default Borrower