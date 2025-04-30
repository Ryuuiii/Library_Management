import React, { useState } from 'react'
import './Transactions.css'
import Layout from '../../components/Layout';
import Table from '../../components/Table/Table';
import ActionButton from '../../components/ActionButtons/ActionButton';
import TransactionForm from '../../components/Forms/TransactionForm';
import { IoMdSearch } from "react-icons/io";
import DotMenu from '../../components/3DotMenu/DotMenu';

const transactionColumns = ['Transaction ID', 'Borrower ID', 'Book ID', 'Transaction Type', 'Borrow Date', 'Due Date', 'Return Date', 'Status']
const transactionRows = [['001', '01230007849', 'LRC-I-C-7274', 'Borrowed', 'April 30, 2025', 'May 5, 2025', '---', 'Borrowed']]

const Transactions = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [mode, setMode] = useState('add'); // 'add' or 'edit'
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionSubmit = (data) => {
    console.log("Transaction submitted:", data);
    // Send to API or add to state here
  };

  const handleEditTransaction = (transaction) => {
    
    setShowTransactionForm(true)
    setMode('edit')
    setSelectedTransaction({
      transactionID: transaction[0],
      borrowerID: transaction[1],
      bookID: transaction[2],
      transactionType: transaction[3],
      borrowDate: transaction[4],
      dueDate: transaction[5],
      returnDate: transaction[6],
      status: transaction[7],
    });
  };

  const handleDeleteTransaction = () => {

  };

  return (
    <Layout title='Transactions'>
      <div className='transactions-content'>
        <header className='transaction-header'>
          <div className='transaction-filter'>
            <div className='search-bar'>
              <input type="search" placeholder='Search by book or borrower . . . . . . .' />
              <IoMdSearch className='search-icon'/>
            </div>

            <select className='filter-status'>
              <option value="">Select Status</option>
              <option value="all">All Status</option>
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
            </select>

          </div>

          <div className='transaction-buttons'>
            <ActionButton label='+ Add Transaction' onClick={()=> {setShowTransactionForm(true); setMode('add'); setSelectedTransaction(null)}} />          
          </div>
        </header>

        <Table 
          columns={transactionColumns} 
          rows={transactionRows} 
          showDotMenu={true}
          renderAction={(row, rowIdx) => (
            <DotMenu
              onEdit={() => handleEditTransaction(row)}
              onDelete={() => handleDeleteTransaction(rowIdx)}
            />
          )}
        />
      </div>


      {showTransactionForm && (
        <TransactionForm
          onSubmit={handleTransactionSubmit}
          onClose={() => setShowTransactionForm(false)}
          initialData={selectedTransaction}
          mode={mode}
        />
      )}

    </Layout>
  );
}

export default Transactions