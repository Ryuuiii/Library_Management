import React from 'react'
import Layout from '../../components/Layout/Layout'
import BorrowerTable from '../../components/Table/BorrowerTable';
import { IoMdSearch } from "react-icons/io";
import './Borrower.css'

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


        <BorrowerTable />
      </div>
    </Layout>
  )
}

export default Borrower