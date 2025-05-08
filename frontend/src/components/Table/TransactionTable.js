import React from 'react';
import DotMenu from '../3DotMenu/DotMenu';
import './Table.css';

const TransactionTable = ({ transactions, onDeleteTransaction, onEditClick }) => {
  const handleDeleteTransaction = async (transactionID) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      await onDeleteTransaction(transactionID);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Borrower ID</th>
            <th>Book ID</th>
            <th>Transaction Type</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.TransactionID}>
                <td>{transaction.TransactionID}</td>
                <td>{transaction.BorrowerID}</td>
                <td>{transaction.BookID}</td>
                <td>{transaction.TransactionType}</td>
                <td>{transaction.BorrowDate}</td>
                <td>{transaction.DueDate}</td>
                <td>{transaction.returnDate}</td>
                <td className="last-cell">
                  <span>{transaction.Status}</span>
                  <DotMenu
                    onEdit={() => onEditClick(transaction)}
                    onDelete={() => handleDeleteTransaction(transaction.TransactionID)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No Transaction Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
