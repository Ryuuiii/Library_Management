import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import './FormStyles.css';

const BorrowerForm = ({ onSubmit, onClose, initialData = {}, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    borrowerID: initialData.borrowerID || initialData.BorrowerID || "",
    emailAddress: initialData.emailAddress || initialData.EmailAddress || "",
    Name: initialData.Name || initialData.name || "",
    borrowerTypeID: initialData.borrowerTypeID || initialData.BorrowerTypeID || "",
    programID: initialData.programID || initialData.ProgramID || "",
    yearLevel: initialData.yearLevel || initialData.YearLevel || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const [isSubmitting, setIsSubmitting] = useState(false);
  
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return; // Prevent duplicate submissions
  setIsSubmitting(true);

  console.log("Form Data Sent to Backend:", formData); // Debugging

  try {
    const endpoint =
      mode === "edit"
        ? `http://localhost/api/editBorrower.php?id=${formData.borrowerID}`
        : "http://localhost/api/addBorrower.php";

    const method = mode === "edit" ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Response from Backend:", result);

    if (response.ok) {
      alert(result.message || (mode === "edit" ? "Borrower updated successfully" : "Borrower added successfully"));
      onSubmit(formData); // Notify parent component
      onClose(); // Close the form
    } else {
      alert(result.error || (mode === "edit" ? "Failed to update borrower" : "Failed to add borrower"));
    }
  } catch (error) {
    console.error("Error submitting borrower data:", error);
    alert("An error occurred while submitting the borrower data");
  } finally {
    setIsSubmitting(false); // Reset the flag
  }
};

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
              disabled={mode === "edit"} // Disable Borrower ID field in edit mode
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
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Borrower Type ID</label>
            <select
              name="borrowerTypeID"
              value={formData.borrowerTypeID}
              onChange={handleChange}
              required
            >
              <option value="">Select Borrower Type ID</option>
              <option value="ST01">ST01</option>
              <option value="FC01">FC01</option>
            </select>
          </div>

            <div className="form-group">
              <label>Program</label>
                <select
                  name="programID"
                  value={formData.programID}
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
