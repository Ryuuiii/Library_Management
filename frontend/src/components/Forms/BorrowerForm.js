import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import './FormStyles.css'

const BorrowerForm = ({onSubmit, onClose, initialData = {}, mode = 'add'}) => {
  
  const [formData, setFormData] = useState({
    borrowerID: "",
    emailAddress: "",
    fullName: "",
    borrowerTypeID: "",
    programName: "",
    yearLevel: "",

    ...initialData,
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = () => {

  }


  return (
    <div className="modal-overlay">
      <IoMdClose className="close-btn" onClick={onClose} />
      <div className="modal-content">
        <h2>{mode === "edit" ? "Edit Borrower" : "Add New Borrower"}</h2>

        <form onSubmit={handleSubmit} className="form">
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
            <label>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
            />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Borrower Type ID</label>
            <select value={formData.borrowerTypeID} onChange={handleChange}>
              <option value="">Select Borrower Type ID</option>
              <option value="ST01">ST01</option>
              <option value=""></option>
            </select>
          </div>

          <div className="form-group">
            <label>Program Name</label>
            <input
              type="text"
              name="programName"
              value={formData.programName}
              onChange={handleChange}
              placeholder="Enter Program Name (e.g BSCS)"
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

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {mode === "edit" ? "Update Borrower" : "Add New Borrower"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowerForm;
