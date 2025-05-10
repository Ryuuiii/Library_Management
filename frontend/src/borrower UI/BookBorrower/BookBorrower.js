import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BLayout from '../../components/Layout/BLayout';
import Pagination from '../../components/Pagination/Pagination';
import { IoMdSearch } from "react-icons/io";
import './BookBorrower.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost/Library_Management/backend/api/BookBorrower.php?search=${searchQuery}&yearLevel=${selectedYearLevel}&program=${selectedProgram}&page=${currentPage}`
      );
      const data = await response.json();

      if (data.books) {
        
        const updatedBooks = data.books.map(book => ({
          ...book,
          AvailableCopies: Math.floor(Math.random() * 3) + 1, 
        }));
        setBooks(updatedBooks);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedProgram, selectedYearLevel, currentPage]);

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
                placeholder='Search by title, author, or subject . . . . . . .'
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
  <option value="CS01">BSCS</option>
  <option value="IT01">BSIT</option>
  <option value="EMC01">BSEMC</option>
</select>

          </div>
        </header>

        <div className="book-table-wrapper">
          <table className="book-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Published Year</th>
                <th>Subject</th>
                <th>Program ID</th>
                <th>Year Level</th>
                <th>Available Copies</th>
              </tr>
            </thead>
            <tbody>
  {books.length === 0 ? (
    <tr>
      <td colSpan="8">No books found.</td>
    </tr>
  ) : (
    books.map((book, index) => (
      <tr key={index}>
        <td>{book.BookID}</td>
        <td>{book.Title}</td>
        <td>{book.Author}</td>
        <td>{book.PublishedYear}</td>
        <td>{book.Subject}</td>
        <td>
          {book.ProgramID === 'CS01' ? 'BSCS' :
           book.ProgramID === 'IT01' ? 'BSIT' :
           book.ProgramID === 'EMC01' ? 'BSEMC' :
           book.ProgramID}
        </td>
        <td>{book.YearLevel}</td>
        <td>{book.AvailableCopies}</td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>

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
