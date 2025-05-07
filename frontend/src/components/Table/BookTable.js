import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import './Table.css'; // Add styles for the dropdown menu

const BookTable = ({ books, onEditBook, onDeleteBook }) => {
  const [activeMenu, setActiveMenu] = useState(null); // Track which menu is open

  const toggleMenu = (bookId) => {
    setActiveMenu(activeMenu === bookId ? null : bookId); // Toggle the menu for the specific book
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Published</th>
          <th>Subject</th>
          <th>Program ID</th>
          <th>Year Level</th>
          <th>Available Copies</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.BookID}>
            <td>{book.BookID}</td>
            <td>{book.BookTitle}</td>
            <td>{book.Author}</td>
            <td>{book.PublishedYear}</td>
            <td>{book.Subject}</td>
            <td>{book.ProgramIDs}</td>
            <td>{book.YearLevel}</td>
            <td>{book.AvailableCopies}</td>
            <td>
              <div className="actions-menu">
                <FaEllipsisV
                  className="menu-icon"
                  onClick={() => toggleMenu(book.BookID)}
                />
                {activeMenu === book.BookID && (
                  <div className="menu-dropdown">
                    <button onClick={() => onEditBook(book.BookID, book)}>
                      Edit
                    </button>
                    <button onClick={() => onDeleteBook(book.BookID)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;