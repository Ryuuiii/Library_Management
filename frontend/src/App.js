import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Books from './pages/Books/Books'
import Borrower from './pages/Borrower/Borrower'
import Transactions from './pages/Transactions/Transactions'
import Profile from './borrower UI/Profile/Profile'
import BookBorrower from './borrower UI/BookBorrower/BookBorrower'
import Notifications from './borrower UI/Notification/Notifications'

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/books' element={<Books />} />
        <Route path='/borrower' element={<Borrower />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/borrower/profile' element={<Profile/>} />
        <Route path='/borrower/notification' element={<Notifications/>} />
        <Route path='/borrower/books' element={<BookBorrower/>} />

      </Routes>
   </Router>
  );
}

export default App;
