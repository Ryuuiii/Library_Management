import React, { useState, useEffect } from 'react';
import ALayout from '../../components/Layout/ALayout';
import ActionButton from '../../components/ActionButtons/ActionButton';
import StatsCard from '../../components/StatsCard/StatsCard';
import TransactionTable from '../../components/Table/TransactionTable';
import BookForm from '../../components/Forms/BookForm';
import TransactionForm from '../../components/Forms/TransactionForm';
import BorrowerForm from '../../components/Forms/BorrowerForm';
import { FaBook, FaBookReader, FaBookmark, FaClock, FaChartArea } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import './Dashboard.css';

const Dashboard = () => {
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isBorrowerFormOpen, setIsBorrowerFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('7days'); 
  const [filteredData, setFilteredData] = useState([]); 
  const [transactions, setTransactions] = useState([]);
  const [bookStats, setBookStats] = useState({
    total: 0,
    borrowed: 0,
    available: 0,
    overdue: 0
  });
  const [userRole, setUserRole] = useState(''); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
      setLoading(false);
    } else {
      fetchUserRole();
    }
  }, []);
  
  
  const fetchUserRole = async () => {
    try {
      console.log('Fetching user role...');
      const response = await fetch('http://localhost/api/getUserRole.php', {
        method: 'GET',
        credentials: 'include',
      });
      console.log('Response:', response);
      const data = await response.json();
      console.log('Fetched user role:', data);
      if (response.ok) {
        setUserRole(data.role);
      } else {
        console.error('Failed to fetch user role:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const fetchBookStats = async () => {
      try {
        console.log('Fetching book statistics...');
        const response = await fetch('http://localhost/api/dashboard_stats.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Fetched book statistics:', data);
    
        if (response.ok) {
          setBookStats({
            total: data.total,
            available: data.available,
            borrowed: data.borrowed || 0, 
            overdue: data.overdue || 0,
          });
        } else {
          console.error('Failed to fetch book statistics:', data.error);
        }
      } catch (error) {
        console.error('Error fetching book statistics:', error);
      }
    };
  
    fetchBookStats();
  }, []);

  useEffect(() => {
    // 🔧 TODO: Fetch recent transactions (limit = 5)
  }, []);

  const handleEditTransaction = () => {
    // Handle the edit transactions logic API
  };

  const handleDeleteTransaction = () => {
    // Handle delete transactions logic API
  };

  if (loading) {
    console.log('Loading user role...');
    return <div>Loading...</div>;
  }

  return (
    <ALayout title="Dashboard">
      <div className="dashboard-content">
        <div className="opening">
        <h1>Welcome, {userRole === 'admin' ? 'Admin' : userRole === 'borrower' ? 'Borrower' : 'User'}!</h1>
        </div>
        <section className="stats-grid">
          <StatsCard icon={<FaBook />} label="Total Books" value={bookStats.total} color="#4B0082" />
          <StatsCard icon={<FaBookReader />} label="Borrowed Books" value={bookStats.borrowed} color="#FFA500" />
          <StatsCard icon={<FaBookmark />} label="Available Books" value={bookStats.available} color="#008000" />
          <StatsCard icon={<FaClock />} label="Overdue Books" value={bookStats.overdue} color="#FF0000" />
        </section>

        <section className="chart-and-action">
          <div className="area-chart">
            <div className="area-header">
              <h2><FaChartArea className="area-icon" /> Borrow and Return Activity</h2>
              <div className="filter-buttons">
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
                    dataKey="name" 
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

          <div className="quick-actions">
            <h2>⚡Quick Actions</h2>
            <div className='action-buttons'>
              <ActionButton label='+ Add New Book' onClick={() => setIsBookFormOpen(true)} />
              <ActionButton label='+ Add Transaction' onClick={() => setIsTransactionFormOpen(true)} />
              <ActionButton label='+ Add Borrower' onClick={() => setIsBorrowerFormOpen(true)} />
            </div>
          </div>
        </section>

        <section className="recent-transactions">
          <h2><BsFileEarmarkBarGraphFill className="recenTrans-icon" />Recent Transactions</h2>
          <TransactionTable
            transactions={transactions} 
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
          />
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

      {isBorrowerFormOpen && (
        <BorrowerForm
          onClose={() => setIsBorrowerFormOpen(false)}
          mode='add'
          onSubmit={(newBorrower) => {
            console.log('Borrower:', newBorrower)
            setIsBorrowerFormOpen(false)
          }}
        />
      )}
    </ALayout>
  );
};

export default Dashboard;