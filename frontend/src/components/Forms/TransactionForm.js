import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        transactionID: initialData.transactionID || initialData.TransactionID || "",
        borrowerID: initialData.borrowerID || initialData.BorrowerID || "",
        bookID: initialData.bookID || initialData.BookID || "",
        transactionType: initialData.transactionType || initialData.TransactionType || "",
        borrowDate: initialData.borrowDate || initialData.BorrowDate || "",
        dueDate: initialData.dueDate || initialData.DueDate || "",
        returnDate: initialData.returnDate || initialData.ReturnDate || "",
        status: initialData.status || initialData.Status || "",
      });
    }
  }, [initialData, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure returnDate is null if empty
    const sanitizedFormData = {...formData,returnDate: formData.returnDate,
    };
  
    console.log("Form Data Submitted:", sanitizedFormData); 
    onSubmit(sanitizedFormData); 

    if(mode === "edit") {
      toast.success("Transaction updated successfully");
    } else{
      toast.success("Transaction added successfully");
    }
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
              <option value="Borrowed">Borrowed</option>
              <option value="Returned">Returned</option>
              <option value="Overdue">Overdue</option>
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
