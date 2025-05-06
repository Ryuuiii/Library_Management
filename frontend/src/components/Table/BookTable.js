import React from 'react';
import './Table.css';

const BookTable = ({ books }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Published Year</th>
          <th>Subject</th>
          <th>Program IDs</th>
          <th>Year Level</th>
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
              <td>{book.ProgramIDs || 'N/A'}</td>
              <td>{book.YearLevel}</td>
              <td>{book.AvailableCopies}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No books available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookTable;