import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import './FormStyles.css';

const AdminForm = ({ onSubmit, onClose, initialData = {}, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    adminID: "",
    role: "",
    name: "",
    ...initialData,
  });

  const [showResultModal, setShowResultModal] = useState(false);
  const [createdLoginID, setCreatedLoginID] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/api/adminreg.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setCreatedLoginID(result.loginID);
        setGeneratedPassword(result.defaultPassword);
        setShowResultModal(true);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <IoMdClose className="close" onClick={onClose} />
        <div className="modal-content">
          <h2>{mode === "edit" ? "Edit Admin" : "Add New Admin"}</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Admin ID</label>
              <input
                type="text"
                name="adminID"
                value={formData.adminID}
                onChange={handleChange}
                placeholder="Enter Admin ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter Role"
                required
              />
            </div>

            <div className="form-group full-length">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
              />
            </div>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {mode === "edit" ? "Update Admin" : "Add New Admin"}
            </button>
          </form>
        </div>
      </div>

      {showResultModal && (
        <div className="modal-overlay">
          <div className="modal-content result-modal">
            <h3>✅ Admin Created Successfully</h3>
            <p><strong>Login ID:</strong> {createdLoginID}</p>
            <p><strong>Temporary Password:</strong> {generatedPassword}</p>
            <button className="submit-btn" onClick={() => {
              setShowResultModal(false);
              onClose(); // close main form too
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminForm;
