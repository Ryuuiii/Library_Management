import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BLayout from '../../components/Layout/BLayout'
import BookTable from '../../components/Table/BookTable';
import Pagination from '../../components/Pagination/Pagination';
import { IoMdSearch } from "react-icons/io";
import './BookBorrower.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // TODO: Fetch books from backend API
    // e.g., GET /api/books?search=...&page=...
  }, [searchQuery, selectedProgram, selectedYearLevel, currentPage]);

  const handleAddBook = () => {
    // TODO: POST request to add a book
  };

  const handleEditBook = () => {
    // TODO: PUT request to edit a book
  };

  const handleDeleteBook = () => {
    // TODO: DELETE request to delete a book
  };

  return (
    <BLayout title='Book Management'>
      <div className='books-content'>
        <header className='bookpage-header'>
          <div className='book-filter'>
            <div className='search-bar'>
              <div className="notifi2">
                          <Link to="/borrower/notification" className="notification-icon2" title="You have received a new notification">
                            🔔
                          </Link>
                        </div>
              <input
                type="search"
                placeholder='Search by title, author or subject . . . . . . .'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <IoMdSearch className='search-icon' />
            </div>

            <select
              className='year-level'
              value={selectedYearLevel}
              onChange={(e) => {
                setSelectedYearLevel(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select
              className='program'
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Program</option>
              <option value="CS01">CS01</option>
              <option value="IT01">IT01</option>
              <option value="EMC01">EMC01</option>
            </select>

           
          </div>
        </header>

        <BookTable
          books={books}
          onDeleteBook={handleDeleteBook}
          onEditBook={handleEditBook}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </BLayout>
  );
};

export default Books;