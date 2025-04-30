import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Books from './pages/Books/Books';
import Borrower from './pages/Borrower/Borrower';
import Transactions from './pages/Transactions/Transactions';

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
      </Routes>
   </Router>
  );
}

export default App;
