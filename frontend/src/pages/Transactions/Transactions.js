import React, { useEffect, useState } from 'react'
import ALayout from '../../components/Layout/ALayout';
import TransactionTable from  '../../components/Table/TransactionTable'
import ActionButton from '../../components/ActionButtons/ActionButton';
import { IoMdSearch } from "react-icons/io";
import './Transactions.css'
import Pagination from '../../components/Pagination/Pagination';
import TransactionForm from '../../components/Forms/TransactionForm';

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    // TODO: Fetch transactions from backend API kapage meron
    // 🚧 GET transactions with support for search, filters, 
    // and pagination (kahit 10 rows per page siguro)
  }, [searchQuery, selectedStatus, currentPage])

  const handleAddTransaction = () => {
    //TODO: Send POST request sa backend para mag add ng transaction
  }

  const handleEditTransaction = () => {
    //TODO: Send PUT request sa backend para mag update ng transaction
  }

  const handleDeleteTransaction = () =>{
    //TODO: Send DELETE request sa backend para mag delete ng transaction
  } 


  return (
    <ALayout title='Transactions'>
      <div className='transactions-content'>
        <header className='transaction-header'>
          <div className='transaction-filter'>
            <div className='search-bar'>
              <input 
                type="search" 
                placeholder='Search by book or borrower . . . . . . .' 
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1)}}
              />
              <IoMdSearch className='search-icon'/>
            </div>

            <select className='filter-status' value={selectedStatus} onChange={(e) => {setSelectedStatus(e.target.value); setCurrentPage(1)}}>
              <option value="all">All Status</option>
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
            </select>

          </div>

          <div className='transaction-buttons'>
            <ActionButton label='+ Add Transaction'
            onClick={() =>setIsTransactionFormOpen(true)}/>          
          </div>
        </header>

        <TransactionTable 
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleEditTransaction}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {isTransactionFormOpen && (
        <TransactionForm
          onClose={() => setIsTransactionFormOpen(false)}
          mode='add'
          onSubmit={(formData) => {
            handleAddTransaction(formData)
            setIsTransactionFormOpen(false)
          }}
        />
      )}
    </ALayout>
  );
}

export default Transactions