import React, { useState } from 'react'
import DotMenu from '../3DotMenu/DotMenu'
import './Table.css'
import BookForm from '../Forms/BookForm';

const BookTable = ({ books, onDeleteBook, onEditBook}) => {
  const [editBook, setEditBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEditBook = (book) => {
    setSelectedBook(book)
    setEditBook(true)
  }

  const handleDeleteBook = async (bookID) => {
    if(window.confirm("Are you sure you want to delete this book?")) {
      await onDeleteBook(bookID)
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Subject</th>
            <th>Program ID</th>
            <th>Year Level</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.bookID}>
                <td>{book.bookID}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishedYear}</td>
                <td>{book.subject}</td>
                <td>{book.programID}</td>
                <td>{book.yearLevel}</td>
                <td className="last-cell">
                  <span>{book.availableCopies}</span>
                  <DotMenu
                    onEdit={() => handleEditBook(book)}
                    onDelete={() => handleDeleteBook(book.bookID)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No books available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editBook && (
        <BookForm
          onClose={() => setEditBook(false)}
          mode='edit'
          initialData={selectedBook}
          onSubmit={(updatedBook) => {
            onEditBook(updatedBook)
            setEditBook(false);
          }}
        />
      )}
    </div>

  )
}

export default BookTable