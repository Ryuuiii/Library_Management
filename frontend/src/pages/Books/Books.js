import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import BookTable from '../../components/Table/BookTable';
import ActionButton from '../../components/ActionButtons/ActionButton';
import BookForm from '../../components/Forms/BookForm';
import Pagination from '../../components/Pagination/Pagination';
import { IoMdSearch } from "react-icons/io";
import './Books.css'

const Books = () => {
  const [books, setBooks] = useState([
    { bookID: "1", title: "Book One", author: "Author A", publishedYear: "2020", subject: "Math", programID: "BSCS", yearLevel: "1", availableCopies: 5 },
    { bookID: "2", title: "Book Two", author: "Author B", publishedYear: "2021", subject: "Science", programID: "BSIT", yearLevel: "2", availableCopies: 3 },
    { bookID: "3", title: "Book Three", author: "Author C", publishedYear: "2019", subject: "History", programID: "BSEMC", yearLevel: "3", availableCopies: 7 },
    { bookID: "4", title: "Book Four", author: "Author D", publishedYear: "2022", subject: "English", programID: "BSCS", yearLevel: "4", availableCopies: 2 },
    { bookID: "5", title: "Book Five", author: "Author E", publishedYear: "2023", subject: "Programming", programID: "BSIT", yearLevel: "1", availableCopies: 4 },
    { bookID: "6", title: "Book Six", author: "Author F", publishedYear: "2020", subject: "Physics", programID: "BSEMC", yearLevel: "2", availableCopies: 6 },
  ]);
  const [isBookOpen, setIsBookOpen ] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    //Fetch All books from the backend
  })

  const handleAddBook = () => {
    //Add book to the backend
  }

  const handleEditBook = () => {
    //Edit book in the backend
  }

  const handleDeleteBook = () => {
    //Delete book in the backend
  }

  useEffect(() => {  //Filter the table using search bar o kaya dropdown selection by year level and program ID
    const filtered  = books.filter((book) => {
      const matchSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase()) 

      const matchYear = 
        selectedYearLevel === 'all' || book.yearLevel === selectedYearLevel

      const matchProgram = 
        selectedProgram === 'all' || book.programID === selectedProgram

      return matchSearch && matchYear && matchProgram;
    })
    setFilteredBooks(filtered);
    setCurrentPage(1); 
  }, [searchQuery, selectedYearLevel, selectedProgram, books])

  return (
    <Layout title='Book Management'>
      <div className='books-content'>
        <header className='bookpage-header'>
          <div className='book-filter'>
            <div className='search-bar'>
              <input 
                type="search" 
                placeholder='Search by title, author or subject . . . . . . .' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoMdSearch className='search-icon'/>
            </div>
            
            <select className='year-level' value={selectedYearLevel} onChange={(e) => setSelectedYearLevel(e.target.value)}>
              <option value="all">All Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select className='program' value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)}>
              <option value="all">All Program</option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
              <option value="BSEMC">BSEMC</option>
            </select>
          </div>

            <div className='button-container'>
              <ActionButton 
                label='+ Add New Book' 
                onClick={() => setIsBookOpen(true)}/>
            </div>
        </header>

        <BookTable
        books={currentBooks} // Pass paginated data to BookTable
        onDeleteBook={(bookID) => setBooks(books.filter((book) => book.bookID !== bookID))}
        onEditBook={(updatedBook) => {
          setBooks(books.map((book) => (book.bookID === updatedBook.bookID ? updatedBook : book)));
        }}
      />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {isBookOpen && (
        <BookForm
          onClose={() => setIsBookOpen(false)}
          mode="add"
          onSubmit={(formData) => {
            handleAddBook(formData)
            setIsBookOpen(false)
          }}
        />
      )}
    </Layout>
  );
}

export default Books