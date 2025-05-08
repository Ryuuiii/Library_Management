import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import './Table.css';

const BorrowerTable = ({ borrowers, onEditBorrower, onDeleteBorrower }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (BorrowerId) => {
    setActiveMenu(activeMenu === BorrowerId ? null : BorrowerId);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Borrower ID</th>
          <th>Email Address</th>
          <th>Full Name</th>
          <th>Borrower Type ID</th>
          <th>Program ID</th>
          <th>Year Level</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {borrowers.map((borrower) => (
          <tr key={borrower.BorrowerID}>
            <td>{borrower.BorrowerID}</td>
            <td>{borrower.EmailAddress}</td>
            <td>{borrower.Name}</td>
            <td>{borrower.BorrowerTypeID}</td>
            <td>{borrower.ProgramID}</td>
            <td>{borrower.YearLevel}</td>
            <td>
              <div className="actions-menu">
                <FaEllipsisV
                  className="menu-icon"
                  onClick={() => toggleMenu(borrower.BorrowerID)}
                />
                {activeMenu === borrower.BorrowerID && (
                  <div className="menu-dropdown">
                    <button onClick={() => onEditBorrower(borrower)}>Edit</button>
                    <button onClick={() => onDeleteBorrower(borrower.BorrowerID)}>Delete</button>
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

export default BorrowerTable;
