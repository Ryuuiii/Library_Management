import React, { useState, useEffect } from 'react';
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
    ...initialData, // prefill data for edit mode
  });

  useEffect(() => {
    setFormData({ ...initialData }); // re-sync form data when initialData changes
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the parent submit function
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
              type="number" 
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
              type="number" 
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
            <select name="transactionType" value={formData.transactionType} onChange={handleChange}>
              <option value="">Select Transaction Type</option>
              <option value="borrow">Borrow Book</option>
              <option value="return">Return Book</option>
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
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Enter Status"
              required
            />
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
