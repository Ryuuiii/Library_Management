import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import './FormStyles.css';

const TransactionForm = ({ onSubmit, onClose, initialData = {}, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    transactionID: "",
    borrowerID: "",
    bookID: "",
    transactionType: "",
    borrowDate: "",
    dueDate: "",
    returnDate: "",
    status: "",
  });

  React.useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        transactionID: initialData.transactionID || "",
        borrowerID: initialData.borrowerID || "",
        bookID: initialData.bookID || "",
        transactionType: initialData.transactionType || "",
        borrowDate: initialData.borrowDate || "",
        dueDate: initialData.dueDate || "",
        returnDate: initialData.returnDate || "",
        status: initialData.status || "",
      });
    }
  }, [initialData, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure returnDate is null if empty
    const sanitizedFormData = {
      ...formData,
      returnDate: formData.returnDate,
    };
  
    console.log("Form Data Submitted:", sanitizedFormData); // Debugging
    onSubmit(sanitizedFormData); // Pass the sanitized form data to the parent component
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <IoMdClose className="close-icon" onClick={onClose} />
      <div className="modal-content">
        <h2>{mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Transaction ID</label>
            <input 
              type="text" 
              name="transactionID" 
              value={formData.transactionID}
              onChange={handleChange}
              placeholder="Enter Transaction ID" 
              required
            />
          </div>

          <div className="form-group">
            <label>Borrower ID</label>
            <input 
              type="text" 
              name="borrowerID"
              value={formData.borrowerID} 
              onChange={handleChange}
              placeholder="Enter Borrower ID" 
              required
            />
          </div>

          <div className="form-group">
            <label>Book ID</label>
            <input 
              type="text" 
              name="bookID" 
              value={formData.bookID}
              onChange={handleChange}
              placeholder="Enter Book ID" 
              required
            />
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <select 
              name="transactionType" 
              value={formData.transactionType} onChange={handleChange}
            >
              <option value="">Select Transaction Type</option>
              <option value="Borrow Book">Borrow Book</option>
              <option value="Return Book">Return Book</option>
            </select>
          </div>

          <div className="form-group">
            <label>Borrow Date</label>
            <input 
              type="date" 
              name="borrowDate" 
              value={formData.borrowDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
            />
          </div>



          <div className='form-group'>
            <label>Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="submit-btn">
            {mode === "edit" ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
