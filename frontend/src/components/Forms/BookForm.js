import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import './FormStyles.css'

const BookForm = ({onSubmit, onClose, initialData = {}, mode = 'add'}) => {
  const [formData, setFormData] = useState({
    bookID: "",
    title: "",
    author: "",
    publishedYear: "",
    subject: "",
    programID: "",
    yearLevel: "",
    availableCopies: "",
    ...initialData
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Logic for Adding and Updating Books 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <IoMdClose className="close-icon" onClick={onClose} />
      <div className="modal-content">
        <h2>{mode === "edit" ? "Edit Book" : "Add New Book"}</h2>


        <form onSubmit={handleSubmit} className="form">
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
            <label>Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title} 
              onChange={handleChange}
              placeholder="Enter Book Title" 
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input 
              type="text" 
              name="author" 
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Book Author" 
              required
            />
          </div>

          <div className="form-group">
            <label>Published Year</label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="Enter Book Published Year"
              required
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Subject" 
              required
            />
          </div>

          <div className="form-group">
            <label>Program ID</label>
            <input
              type="text"
              name="programID"
              value={formData.programID}
              onChange={handleChange}
              placeholder="Enter Program ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Year Level</label>
            <input
              type="number"
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
              placeholder="Enter Year Level"
              required
            />
          </div>

          <div className="form-group">
            <label>Available Copies</label>
            <input
              type="number"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleChange}
              placeholder="Enter Available Copies"
              required
            />
          </div>

            <button  type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button  type="submit" className="submit-btn">
              {mode === "edit" ? "Update Book" : "Add New Book"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
