import { useEffect, useState } from 'react';
import ALayout from '../../components/Layout/ALayout';
import BookTable from '../../components/Table/BookTable';
import ActionButton from '../../components/ActionButtons/ActionButton';
import BookForm from '../../components/Forms/BookForm';
import Pagination from '../../components/Pagination/Pagination';
import { toast } from 'react-toastify';
import { IoMdSearch } from 'react-icons/io';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost/api/books.php?search=${encodeURIComponent(searchQuery)}&program=${selectedProgram}&yearLevel=${selectedYearLevel}&page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const text = await response.text();
      console.log('Raw response:', text); // Debugging
  
      const data = JSON.parse(text);
      console.log('Fetched books:', data); // Debugging
  
      if (data.books && data.books.length > 0) {
        setBooks(data.books);
        setTotalPages(data.totalPages || 1);
      } else {
        setBooks([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
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
        toast.success(result.message || 'Book added successfully');
        fetchBooks();
      } else {
        toast.error(result.error || 'Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('An error occurred while adding the book');
    }
  };

  const handleEditBook = async (bookID, updatedData) => {
    try {
      const response = await fetch(`http://localhost/api/editBook.php?id=${bookID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      const text = await response.text();
      console.log("Raw response from backend:", text); // Debugging
  
      const result = JSON.parse(text);
  
      if (response.ok) {
        toast.success(result.message || 'Book updated successfully');
        
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.bookID === bookID ? { ...book, ...updatedData } : book
          )
        );
      } else {
        toast.error(result.error || 'Failed to update book');
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error('An error occurred while updating the book');
    }
  };


  const handleDeleteBook = async (bookID) => {
    try {
      const response = await fetch(`http://localhost/api/deleteBook.php?id=${bookID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Book deleted successfully');
        fetchBooks();
      } else {
        toast.error(result.error || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('An error occurred while deleting the book');
    }
  };

  const openEditForm = (book) => {
    console.log("Editing book:", book); 
    setIsEditMode(true);// Debugging
    setCurrentBook({
      bookID: book.bookID,
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      subject: book.subject,
      programID: book.programID,
      yearLevel: book.yearLevel,
      availableCopies: book.availableCopies,
    }); 
    setIsBookOpen(true);
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
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <IoMdSearch className="search-icon" />
            </div>

            <select
              className="year-level"
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
              className="program"
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Program</option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
              <option value="BSEMC">BSEMC</option>
            </select>
          </div>

          <div className="button-container">
            <ActionButton
              label="+ Add New Book"
              onClick={() => {
                setIsEditMode(false);
                setCurrentBook(null);
                setIsBookOpen(true);
              }}
            />
          </div>
        </header>

        <BookTable
          books={books}
          onEditBook={(book) => openEditForm(book)}
          onDeleteBook={(bookID) => handleDeleteBook(bookID)}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {isBookOpen && (
        <BookForm
        initialData={currentBook}
        mode={isEditMode ? 'edit' : 'add'}
        onClose={() => {setIsBookOpen(false); setIsEditMode(false);}}
        onSubmit={(formData) => {
          if (currentBook) {
            handleEditBook(currentBook.bookID, formData); 
          } else {
            handleAddBook(formData); 
          }
          setIsBookOpen(false);
          
        }}
      />
      )}
    </ALayout>
  );
};

export default Books;
