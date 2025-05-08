import React, { useState } from 'react';
import DotMenu from '../3DotMenu/DotMenu';
import './Table.css';
import BookForm from '../Forms/BookForm';

const BookTable = ({ books, onDeleteBook, onEditBook }) => {
  const [editBook, setEditBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setEditBook(true);
  };

  const handleDeleteBook = async (bookID) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await onDeleteBook(bookID);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year Published</th>
            <th>Subject</th>
            <th>ProgramID</th>
            <th>YearLevel</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.BookID}>
                <td>{book.BookID}</td>
                <td>{book.BookTitle}</td>
                <td>{book.Author}</td>
                <td>{book.PublishedYear}</td>
                <td>{book.Subject}</td>
                <td>{book.ProgramIDs}</td>
                <td>{book.YearLevel}</td>
                <td className="last-cell">
                  {book.AvailableCopies}
                  <DotMenu
                    onEdit={() => handleEditBook(book)}
                    onDelete={() => handleDeleteBook(book.BookID)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No Books Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editBook && (
        <BookForm
          onClose={() => setEditBook(false)}
          mode="edit"
          initialData={selectedBook}
          onSubmit={(updatedBook) => {
            onEditBook(updatedBook);
            setEditBook(false);
          }}
        />
      )}
    </div>
  );
};

export default BookTable;