import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Books from './pages/Books/Books'
import Borrower from './pages/Borrower/Borrower'
import AdminProfile from './pages/Profile/Profile'
import Transactions from './pages/Transactions/Transactions'
import BorrowerProfile from './borrower UI/Profile/Profile'
import BookBorrower from './borrower UI/BookBorrower/BookBorrower'
import Notifications from './borrower UI/Notification/Notifications'

function App() {
  return (
   <Router>
    <ToastContainer position='bottom-right' autoClose={3000} theme='colored'/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/books' element={<Books />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
        <Route path='/borrower' element={<Borrower />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/borrower/profile' element={<BorrowerProfile />} />
        <Route path='/borrower/notification' element={<Notifications/>} />
        <Route path='/borrower/books' element={<BookBorrower/>} />

      </Routes>
   </Router>
  );
}

export default App;
