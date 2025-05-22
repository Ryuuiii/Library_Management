import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import './FormStyles.css'
import { toast } from 'react-toastify';


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
  });

  useEffect(() => {
  if (mode === 'edit' && initialData) {
    setFormData(prev => {
      if (prev.bookID === initialData.bookID) return prev;
      return {
        bookID: initialData.bookID || "",
        title: initialData.title || "",
        author: initialData.author || "",
        publishedYear: initialData.publishedYear || "",
        subject: initialData.subject || "",
        programID: initialData.programID || "",
        yearLevel: initialData.yearLevel || "",
        availableCopies: initialData.availableCopies || "",
      };
    });
  }
}, [initialData, mode]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form Data:", formData);
  
    try {
      const isEdit = mode === "edit";
      const endpoint = isEdit
        ? `http://localhost/api/editBook.php?id=${formData.bookID}`
        : `http://localhost/api/addBook.php`;
      const method = isEdit ? "PUT" : "POST";
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text();
      console.log("Raw Response:", text); // Debugging
  
      const result = JSON.parse(text);
      console.log("Parsed Response:", result); // Debugging
  
      if (response.ok) {
        alert(result.message || (isEdit ? "Book updated successfully" : "Book added successfully"));
        onClose();
      } else {
        alert(result.error || (isEdit ? "Failed to update book" : "Failed to add book"));
      }
    } catch (error) {
      console.error("Error submitting book form:", error);
      alert("An error occurred while submitting the book form");
    }
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
              value={formData.bookID || ""} 
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
            value={formData.title || ""}
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
              value={formData.author || ""} 
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
              value={formData.publishedYear || ""} 
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
              value={formData.subject || ""}
              onChange={handleChange}
              placeholder="Enter Subject" 
              required
            />
          </div>

          <div className="form-group">
            <label>Program</label>
              <select
                name="programID"
                value={formData.programID || ""} 
                onChange={handleChange}
                required
              >
            <option value="">Select Program</option>
            <option value="BSCS">BSCS</option>
            <option value="BSIT">BSIT</option>
            <option value="BSEMC">BSEMC</option>
              </select>
          </div>

          <div className="form-group">
            <label>Year Level</label>
            <input
              type="number"
              name="yearLevel"
              value={formData.yearLevel || ""} 
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
              value={formData.availableCopies || ""} 
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