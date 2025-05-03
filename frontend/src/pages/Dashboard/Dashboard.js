import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import ActionButton from '../../components/ActionButtons/ActionButton';
import StatsCard from '../../components/StatsCard/StatsCard';
import TransactionTable from '../../components/Table/TransactionTable';
import BookForm from '../../components/Forms/BookForm';
import TransactionForm from '../../components/Forms/TransactionForm';
import { FaBook, FaBookReader, FaBookmark, FaClock, FaChartArea } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import './Dashboard.css';

const Dashboard = () => {
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('7days'); // Default filter
  const [filteredData, setFilteredData] = useState([]); // State for filtered chart data

  // Example data for different filters
  const data7Days = [
    { name: "Monday", Borrowed: 20, Returned: 5 },
    { name: "Tuesday", Borrowed: 5, Returned: 3 },
    { name: "Wednesday", Borrowed: 10, Returned: 15 },
    { name: "Thursday", Borrowed: 15, Returned: 5 },
    { name: "Friday", Borrowed: 12, Returned: 10 },
    { name: "Saturday", Borrowed: 6, Returned: 2 },
    { name: "Sunday", Borrowed: 2, Returned: 6 }
  ];

  const data30Days = [ //Grouped by weekly
    { name: "Week 1", Borrowed: 50, Returned: 20 },
    { name: "Week 2", Borrowed: 40, Returned: 25 },
    { name: "Week 3", Borrowed: 60, Returned: 30 },
    { name: "Week 4", Borrowed: 70, Returned: 35 }
  ];

  const data3Months = [ 
    { name: "February", Borrowed: 150, Returned: 100 },
    { name: "March", Borrowed: 67, Returned: 170 },
    { name: "April", Borrowed: 140, Returned: 90 }
  ];

  // Update filtered data based on the active filter
  useEffect(() => {
    if (activeFilter === '7days') {
      setFilteredData(data7Days);
    } else if (activeFilter === '30days') {
      setFilteredData(data30Days);
    } else if (activeFilter === '3months') {
      setFilteredData(data3Months);
    }
  }, [activeFilter]); // Re-run whenever the active filter changes

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
                <button onClick={() => setActiveFilter('3months')} className={activeFilter === '3months' ? 'active' : ''}>Last 3 months</button>
                <button onClick={() => setActiveFilter('30days')} className={activeFilter === '30days' ? 'active' : ''}>Last 30 days</button>
                <button onClick={() => setActiveFilter('7days')} className={activeFilter === '7days' ? 'active' : ''}>Last 7 days</button>
              </div>
            </div>
            {filteredData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.2rem' }}>No data available for the selected filter</div>
            ) : (
              <ResponsiveContainer width="100%" height={335}>
                <LineChart
                  width={500}
                  height={300}
                  data={filteredData}
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
                    dataKey="name" // Dynamically updates based on the filtered data
                    label={{
                      value: activeFilter === '3months' ? 'Months' : activeFilter === '30days' ? 'Weeks' : 'Days',
                      position: 'outsideBottomCenter',
                      offset: -10,
                      fill: '#800000',
                      fontWeight: 'bold',
                    }}
                    height={60}
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
              <ActionButton label='+ Add New Book' onClick={() => setIsBookFormOpen(true)} />
              <ActionButton label='+ Add Transaction' onClick={() => setIsTransactionFormOpen(true)} />
            </div>
          </div>
        </section>

        <section className='recent-transactions'>
          <h2><BsFileEarmarkBarGraphFill className='recenTrans-icon'/>Recent Transactions</h2>
          <TransactionTable/>
        </section>
      </div>

      {isBookFormOpen && (
        <BookForm
          onClose={() => setIsBookFormOpen(false)}
          mode="add"
          onSubmit={(newBook) => {
            console.log('New Book:', newBook);
            setIsBookFormOpen(false);
          }}
        />
      )}

      {isTransactionFormOpen && (
        <TransactionForm
          onClose={() => setIsTransactionFormOpen(false)}
          mode="add"
          onSubmit={(newTransaction) => {
            console.log('Transaction: ', newTransaction);
            setIsTransactionFormOpen(false);
          }}
        />
      )}
    </Layout>
  );
};

export default Dashboard;