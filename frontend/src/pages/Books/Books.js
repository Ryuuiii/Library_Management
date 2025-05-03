import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import BookTable from '../../components/Table/BookTable';
import ActionButton from '../../components/ActionButtons/ActionButton';
import { IoMdSearch } from "react-icons/io";
import './Books.css'
import BookForm from '../../components/Forms/BookForm';

const Books = () => {
  const [books, setBooks] = useState([])
  const [ isBookOpen, setIsBookOpen ] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {
    //Fetch books from the backend
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


  useEffect(() => {
    //Filter the table using search bar o kaya dropdown selection by year level and program ID
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
          books={filteredBooks}
          onDeleteBook={handleDeleteBook}
          onEditBook={handleEditBook}
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