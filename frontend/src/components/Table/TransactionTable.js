import React, { useState } from 'react'
import DotMenu from '../3DotMenu/DotMenu'
import './Table.css'
import TransactionForm from '../Forms/TransactionForm';

const Table = ({transactions, onDeleteTransaction, onEditTransaction}) => {
  const [editTransaction, setEditTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction)
    setEditTransaction(true)
  }

  const handleDeleteTransaction = async (transactionID) => {
    if(window.confirm("Are you sure you want to delete this transaction?")) {
      await onDeleteTransaction(transactionID)
    }
  }

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
              <tr key={transaction.transactionID}>
                <td>{transaction.transactionID}</td>
                <td>{transaction.borrowerID}</td>
                <td>{transaction.bookID}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.borrowDate}</td>
                <td>{transaction.dueDate}</td>
                <td>{transaction.returnDate}</td>
                <td className='last-cell'>
                  <span>{transaction.status}</span>
                  <DotMenu
                    onEditTransaction={() => handleEditTransaction(transaction)}
                    onDelete={() => handleDeleteTransaction(transaction.transactionID)}
                  />
                </td>
            </tr>
            ))
          ):(
            <tr>
              <td colSpan="8" className='no-data'>
                No Transaction Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editTransaction && (
        <TransactionForm 
          onClose={() => setEditTransaction(false)}
          mode='edit'
          initialData={selectedTransaction}
          onSubmit={(updatedTransaction) => {
            onEditTransaction(updatedTransaction)
            setEditTransaction(false)
          }}
        />
      )}
    </div>
  )
}

export default Table