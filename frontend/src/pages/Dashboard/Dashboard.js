import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Table from '../../components/Table/Table';
import ActionButton from '../../components/ActionButtons/ActionButton';
import StatsCard from '../../components/StatsCard/StatsCard'
import BookForm from '../../components/Forms/BookForm';
import { FaBook, FaBookReader, FaBookmark, FaClock, FaChartArea } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import './Dashboard.css'
import TransactionForm from '../../components/Forms/TransactionForm';

const transactionColumns = ['Transaction ID', 'Borrower ID', 'Book ID', 'Transaction Type', 'Borrow Date', 'Due Date', 'Return Date', 'Status']
const data = [];

const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState('7days');
    const [showBookForm, setShowBookForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showTransactionForm, setShowTransactionForm] = useState(false)


    const handleBookSubmit = (data) => {
      if(editMode) {
        //Update logic here
        console.log('Updating book:', data);
      } else {
        //Add logic here
        console.log('Adding new book:', data);
      }
      setShowBookForm(false);
      setEditMode(false);
      setSelectedBook(null);
    }

    const handleTransactionSubmit = (data) => {
      console.log("Transaction submitted:", data);
      // Send to API or add to state here
      setShowTransactionForm(false);
    };



  return (
    <Layout title='Dashboard'>
    <div className='dashboard-content'> 
      <div className='opening'>
        <h1>Welcome, Admin!</h1>
      </div>
      <section className="stats-grid">
        <StatsCard icon={<FaBook />} label="Total Books" value="1520" color="#4B0082" />
        <StatsCard icon={<FaBookReader />} label="Borrowed Books" value="820" color="#FFA500" />
        <StatsCard icon={<FaBookmark />} label="Available Books" value="650" color="#008000" />
        <StatsCard icon={<FaClock />} label="Overdue Books" value="50" color="#FF0000" />
      </section>

      <section className='chart-and-action'>
        <div className='area-chart'>
          <div className='area-header'>
            <h2><FaChartArea className='area-icon'/> Borrow and Return Activity</h2>
            <div className='filter-buttons'>
              <button onClick={()=> setActiveFilter('3months')} className={activeFilter === '3months' ? 'active' : ''}>Last 3 months</button>
              <button onClick={()=> setActiveFilter('30days')} className={activeFilter === '30days' ? 'active' : ''}>Last 30 days</button>
              <button onClick={()=> setActiveFilter('7days')} className={activeFilter === '7days' ? 'active' : ''}>Last 7 days</button>
            </div>
          </div>
          {data.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.2rem' }}>No data available for the selected filter</div>
            ) : (
              <ResponsiveContainer width="100%" height={335}>
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 10,
                    bottom: 0,
                  }}
                  borderRadius={10}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    label={{
                      value: 'Days',
                      position: 'outsideBottomCenter',
                      offset: -10,
                      fill: '#800000',
                      fontWeight: 'bold',
                    }}
                    height={60}
                    border
                  />
                  <YAxis
                    label={{
                      value: 'Number of Books',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: '#800000', fontWeight: 'bold' },
                    }}
                  />
                  <Tooltip />
                  <Legend iconType="square" iconSize={10} verticalAlign="top" wrapperStyle={{ marginBottom: '3rem' }} />
                  <Line type="monotone" dataKey="Borrowed" stroke="#FFA500" fill="#FFA500" dot={{ r: 3 }} strokeWidth={2} />
                  <Line type="monotone" dataKey="Returned" stroke="#800000" fill="#800000" dot={{ r: 3 }} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
        </div>

        <div className='quick-actions'>
          <h2>⚡Quick Actions</h2>
          <div className='action-buttons'>
            <ActionButton label='+ Add New Book' onClick={()=> { setEditMode(false); setSelectedBook(null); setShowBookForm(true)}}/>
            <ActionButton label='+ Add Transaction' onClick={() => setShowTransactionForm(true)}/>
          </div>
        </div>
      </section>

      <section className='recent-transactions'>
        <h2><BsFileEarmarkBarGraphFill className='recenTrans-icon'/>Recent Transactions</h2>
        <Table columns={transactionColumns}/>
      </section>
    </div>

    {showBookForm && (
        <BookForm
          mode={editMode ? 'edit' : 'add'}
          initialData={selectedBook || {}}
          onSubmit={handleBookSubmit}
          onClose={() => setShowBookForm(false)}
        />
      )}

    {showTransactionForm && (
      <TransactionForm
        onSubmit={handleTransactionSubmit}
        onClose={() => setShowTransactionForm(false)}
      />
    )}

  </Layout>
  );
}

export default Dashboard