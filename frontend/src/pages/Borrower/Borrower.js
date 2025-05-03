import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import BorrowerTable from '../../components/Table/BorrowerTable';
import { IoMdSearch } from "react-icons/io";
import './Borrower.css'

const Borrower = () => {
  const [filteredBorrower, setFilteredBorrower] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');



  useEffect(() => {
    //Filter by search or dropdown selection 
    //Maya ko nagawin katamad pota
  })

  const handleEdit = () =>{
    //Edit Borrower
  }

  const handleDelete = () => {
    //Delete Borrower
  }

  return (
    <Layout title='Borrower Management'>
      <div className='borrower-content'>
      <header className='borrower-header'>
          <div className='borrower-filter'>
            <div className='search-bar'>
              <input type="search" placeholder='Search by name or ID . . . . . . .' />
              <IoMdSearch className='search-icon'/>
            </div>
            
            <select className='type' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">All Borrower Type ID</option>
              <option value="ST01">ST01</option>
              <option value="FC01">FC01</option>
            </select>

            <select className='year-level' value={selectedYearLevel} onChange={(e) => setSelectedYearLevel(e.target.value)}>
              <option value="all">All Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className='buttons'>
          </div>
        </header>


        <BorrowerTable 
          onDeleteBorrower={handleDelete}
          onEditBorrower={handleEdit}
        />
      </div>
    </Layout>
  )
}

export default Borrower