import React from 'react'
import Layout from '../../components/Layout/Layout';
import BookTable from '../../components/Table/BookTable';
import ActionButton from '../../components/ActionButtons/ActionButton';
import { IoMdSearch } from "react-icons/io";
import './Books.css'

const Books = () => {

  return (
    <Layout title='Book Management'>
      <div className='books-content'>
        <header className='bookpage-header'>
          <div className='book-filter'>
            <div className='search-bar'>
              <input type="search" placeholder='Search by title, author or subject . . . . . . .' />
              <IoMdSearch className='search-icon'/>
            </div>
            
            <select className='year-level'>
              <option value="">Select Year Level</option>
              <option value="all">All Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select className='program'>
              <option value="">Select Program</option>
              <option value="all">All Program</option>
              <option>BSCS</option>
              <option>BSIT</option>
              <option>BSEMC</option>
            </select>
          </div>

            <div className='button-container'>
              <ActionButton label='+ Add New Book'/>
            </div>
        </header>

        <BookTable/>
      </div>

    </Layout>
  );
}

export default Books