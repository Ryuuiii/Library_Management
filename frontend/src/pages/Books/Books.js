import React, {useState} from 'react'
import Layout from '../../components/Layout';
import ActionButton from '../../components/ActionButtons/ActionButton';
import Table from '../../components/Table/Table';
import BookForm from '../../components/Forms/BookForm';
import { IoMdSearch } from "react-icons/io";
import './Books.css'
import DotMenu from '../../components/3DotMenu/DotMenu';

const bookColumns = ['Book ID', 'Title', 'Author', 'Published Year', 'Subject', 'Program ID', 'Year Level', 'Available Copies']
const bookRows = [
  ['LRC-I-C-7373', 'Title Sample', 'Author Sample', 'Year Sample', 'Subject Sample', 'Program ID', 'Year Level', 'Available Copies']
]


const Books = () => {
  const [showBookForm, setShowBookForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookSubmit = (data) => {
    if(editMode) {
      //Update logic here
      console.log('Updating book:', data);
    } else {
      //Add logic here
      console.log('Adding new book:', data);
    }
    setShowBookForm(false);
    setEditMode(false);
    setSelectedBook(null);
  }

  const handleEditBook = (book) => {
    setShowBookForm(true)
    setEditMode('edit')
    setSelectedBook({
      bookID: book[0],
      title: book[1],
      author: book[2],
      publishedYear: book[3],
      subject: book[4],
      programID: book[5],
      yearLevel: book[6],
      availableCopies: book[7],
    });
  };

  const handleDeleteBook = () => {

  };

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
              <ActionButton label='+ Add New Book' onClick={()=> { setEditMode(false); setSelectedBook(null); setShowBookForm(true)}}/>
            </div>
        </header>

        <Table 
          columns={bookColumns} 
          rows={bookRows} 
          showDotMenu={true}
          renderAction={(row, rowIdx) => (
            <DotMenu
              onEdit={() => handleEditBook(row)}
              onDelete={() => handleDeleteBook(rowIdx)}
            />
          )}
        />
      </div>


      {showBookForm && (
        <BookForm
          mode={editMode ? 'edit' : 'add'}
          initialData={selectedBook}
          onSubmit={handleBookSubmit}
          onClose={() => setShowBookForm(false)}
        />
      )}
    </Layout>
  );
}

export default Books