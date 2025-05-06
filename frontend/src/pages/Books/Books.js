import React, { useEffect, useState } from 'react';
import ALayout from '../../components/Layout/ALayout';
import BookTable from '../../components/Table/BookTable';
import ActionButton from '../../components/ActionButtons/ActionButton';
import BookForm from '../../components/Forms/BookForm';
import Pagination from '../../components/Pagination/Pagination';
import { IoMdSearch } from 'react-icons/io';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost/api/books.php?search=${searchQuery}&program=${selectedProgram}&yearLevel=${selectedYearLevel}&page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log('Fetched books:', data); // Debugging
  
      if (data.books && data.books.length > 0) {
        setBooks(data.books); // Replace the books state with the new results
        setTotalPages(data.totalPages || 1);
      } else {
        console.warn('No books found:', data);
        setBooks([]); // Clear the books state if no results are found
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered with dependencies:', { searchQuery, selectedProgram, selectedYearLevel, currentPage });
    fetchBooks();
  }, [searchQuery, selectedProgram, selectedYearLevel, currentPage]);

    const handleAddBook = async (formData) => {
    try {
      const response = await fetch('http://localhost/api/addBook.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message || 'Book added successfully');
        fetchBooks(); 
      } else {
        alert(result.error || 'Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('An error occurred while adding the book');
    }
  };
    

  const handleEditBook = () => {
    // TODO: Send PUT request to backend to update book by ID
  };

  const handleDeleteBook = () => {
    // TODO: Send DELETE request to backend to remove book by ID
  };

  return (
    <ALayout title="Book Management">
      <div className="books-content">
        <header className="bookpage-header">
          <div className="book-filter">
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search by title, author or subject . . . . . . ."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value); // Update the search query
                  setCurrentPage(1); // Reset to the first page
                }}
              />
              <IoMdSearch className="search-icon" />
            </div>

            <select
              className="year-level"
              value={selectedYearLevel}
              onChange={(e) => {
                setSelectedYearLevel(e.target.value); // Update the selected year level
                setCurrentPage(1); // Reset to the first page
              }}
            >
              <option value="all">All Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select
              className="program"
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value); // Update the selected program
                setCurrentPage(1); // Reset to the first page
              }}
            >
              <option value="all">All Program</option>
              <option value="CS01">CS01</option>
              <option value="IT01">IT01</option>
              <option value="EMC01">EMC01</option>
            </select>
          </div>

          <div className="button-container">
            <ActionButton label="+ Add New Book" onClick={() => setIsBookOpen(true)} />
          </div>
        </header>

        <BookTable books={books} onDeleteBook={handleDeleteBook} onEditBook={handleEditBook} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            console.log('Page changed to:', page); // Debugging
            setCurrentPage(page);
          }}
        />
      </div>

      {isBookOpen && (
        <BookForm
          onClose={() => setIsBookOpen(false)}
          mode="add"
          onSubmit={(formData) => {
            handleAddBook(formData);
            setIsBookOpen(false);
          }}
        />
      )}
    </ALayout>
  );
};

export default Books;