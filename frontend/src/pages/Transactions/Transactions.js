import React from 'react'
import './Transactions.css'
import Layout from '../../components/Layout/Layout';
import TransactionTable from  '../../components/Table/TransactionTable'
import ActionButton from '../../components/ActionButtons/ActionButton';
import { IoMdSearch } from "react-icons/io";

const Transactions = () => {
 
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
            <ActionButton label='+ Add Transaction'/>          
          </div>
        </header>

        <TransactionTable />
      </div>
    </Layout>
  );
}

export default Transactions