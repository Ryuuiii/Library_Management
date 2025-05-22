import { useState, useEffect } from 'react';
import ALayout from '../../components/Layout/ALayout';
import ActionButton from '../../components/ActionButtons/ActionButton';
import StatsCard from '../../components/StatsCard/StatsCard';
import TransactionTable from '../../components/Table/TransactionTable';
import BookForm from '../../components/Forms/BookForm';
import TransactionForm from '../../components/Forms/TransactionForm';
import BorrowerForm from '../../components/Forms/BorrowerForm';
import AdminForm from '../../components/Forms/AdminForm';
import { FaBook, FaBookReader, FaBookmark, FaClock, FaChartArea } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import './Dashboard.css';
import AdminForm from '../../components/Forms/AdminForm';


const Dashboard = () => {
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isBorrowerFormOpen, setIsBorrowerFormOpen] = useState(false);
  const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('7days'); 
  const [filteredData, setFilteredData] = useState([]); 
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formMode, setFormMode] = useState("add"); 
  const [userRole, setUserRole] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [bookStats, setBookStats] = useState({
    total: 0,
    borrowed: 0,
    available: 0,
    overdue: 0
  });


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
      const response = await fetch('http://localhost/api/getUserRole.php', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
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
        const response = await fetch('http://localhost/api/dashboard_stats.php');
        const data = await response.json();
        if (response.ok) {
          setBookStats({
            total: data.total || 0,
            borrowed: data.borrowed || 0,
            available: data.available || 0,
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
    const fetchChartData = async () => {
      try {
        const response = await fetch(`http://localhost/api/borrow_return_activity.php?filter=${activeFilter}`);
        const data = await response.json();
        console.log('Chart Data:', data);

        if (response.ok) {
          setFilteredData(data);
        } else {
          console.error('Failed to fetch chart data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [activeFilter]);

  const fetchRecentTransactions = async () => {
    try {
      const res = await fetch("http://localhost/api/recent_transaction.php?mode=recent");
      const data = await res.json();
      console.log('Recent Transactions:', data);
  
      if (res.ok) {
        setTransactions(data.transactions || []);
      } else {
        console.error('Failed to fetch transactions:', data.error);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };
  
  useEffect(() => {
    fetchRecentTransactions();
  }, []);
  
  const handleEditTransaction = async (transactionID, updatedTransaction) => {
    console.log("Transaction Data Sent to Backend:", updatedTransaction);
  
    if (JSON.stringify(updatedTransaction) === JSON.stringify(transactions.find(t => t.TransactionID === transactionID))) {
      console.log("No changes made to the transaction.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost/api/edittransaction.php?id=${transactionID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error Response:", errorData);
        toast.error("Failed to update transaction. Check the backend for errors.");
        return;
      }
  
      const result = await response.json();
      console.log("Edit Transaction Response:", result);
  
      toast.success(result.message || "Transaction updated successfully");
  
      fetchRecentTransactions();
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("An error occurred while updating the transaction");
    }
  };


  const handleDeleteTransaction = async (transactionID) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/api/deleteTransaction.php?id=${transactionID}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();
      console.log("Delete Transaction Response:", result);

      if (response.ok) {
        toast.success(result.message || "Transaction deleted successfully");
        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.TransactionID !== transactionID
          )
        );
      } else {
        toast.error(result.error || "Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("An error occurred while deleting the transaction");
    }
  };

  if (loading) return <div>Loading...</div>;

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
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="week"
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
                  <Line type="monotone" dataKey="Borrowed" stroke="#FFA500" dot={{ r: 3 }} strokeWidth={2} />
                  <Line type="monotone" dataKey="Returned" stroke="#800000" dot={{ r: 3 }} strokeWidth={2} />
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
              <ActionButton label='+ Add Admin' onClick={() => setIsAdminFormOpen(true)}/>
            </div>
          </div>
        </section>

        <section className="recent-transactions">
          <h2><BsFileEarmarkBarGraphFill className="recenTrans-icon" />Recent Transactions</h2>
          <TransactionTable
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
        onEditClick={(transaction) => {
          setSelectedTransaction(transaction);
          setFormMode("edit");
          setIsTransactionFormOpen(true);
          }}
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
          mode={formMode}
          initialData={selectedTransaction}
          onSubmit={async (transactionData) => {
            if (formMode === "edit") {
              handleEditTransaction(selectedTransaction.TransactionID, transactionData);
            } else {
              // Add Transaction Logic
              try {
                const response = await fetch("http://localhost/api/addTransaction.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(transactionData),
                });
                const result = await response.json();
                if (response.ok) {
                  toast.success(result.message || "Transaction added successfully");
                  fetchRecentTransactions(); // Refresh the transaction list
                } else {
                  toast.error(result.error || "Failed to add transaction");
                }
              } catch (error) {
                console.error("Error adding transaction:", error);
                toast.error("An error occurred while adding the transaction");
              }
            }
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

      {isAdminFormOpen && (
        <AdminForm 
        onClose={() => setIsAdminFormOpen(false)} 
        mode='add' 
        onSubmit={(newAdmin) => {

        console.log('Admin:', newAdmin) 
        setIsAdminFormOpen(false)}}
        />
      )}
    </ALayout>
  );
};

export default Dashboard;
