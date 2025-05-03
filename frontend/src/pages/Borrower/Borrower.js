import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import BorrowerTable from '../../components/Table/BorrowerTable';
import { IoMdSearch } from "react-icons/io";
import './Borrower.css'
import Pagination from '../../components/Pagination/Pagination';

const Borrower = () => {
  const [borrowers, setBorrowers] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // TODO: Fetch books from backend API once available
    // 🚧 GET with support for search, filters, 
    // and pagination (kahit 10 rows per page siguro)
  }, [searchQuery, selectedType, selectedYearLevel, currentPage])

  const handleEdit = () =>{
     // TODO: Send PUT  request to backend to update Borrower by ID
  }

  const handleDelete = () => {
    // TODO: Send DELETE  request to backend to delete Borrower by ID
  }

  //MAG-ADD BA TAYO NG BORROWER O LIKE FIXED NA YUN SA DATABASE NA LANG AGAD
  //KUNG OO NEED KO NG BUTTON AT NG FORM PARA DON
  return (
    <Layout title='Borrower Management'>
      <div className='borrower-content'>
      <header className='borrower-header'>
          <div className='borrower-filter'>
            <div className='search-bar'>
              <input 
                type="search" 
                placeholder='Search by name or ID . . . . . . .' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
          borrowers={borrowers}
          onDeleteBorrower={handleDelete}
          onEditBorrower={handleEdit}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage}
        />
      </div>
    </Layout>
  )
}

export default Borrower