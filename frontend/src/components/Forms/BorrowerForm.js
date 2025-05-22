import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
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
  const [showResultModal, setShowResultModal] = useState(false);
  const [createdLoginID, setCreatedLoginID] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const isEdit = mode === "edit";
    const endpoint = isEdit
      ? `http://localhost/api/editBorrower.php?id=${formData.borrowerID}`
      : `http://localhost/api/addBorrower.php`;
    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const text = await response.text();
    console.log("Raw Response:", text); 
    const result = JSON.parse(text);

    if (response.ok) {
        if (!isEdit) {
    setCreatedLoginID(result.loginID);
    setGeneratedPassword(result.defaultPassword);
    setShowResultModal(true);
  } else {
    toast.success(result.message || "Borrower updated successfully");
    onSubmit(formData);
    onClose();
  }

    } else {
      toast.error(result.error || (isEdit ? "Failed to update borrower" : "Failed to add borrower"));
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while submitting the form.");
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
            <select
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
              required              
            >
              <option value="">Select Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              </select>
          </div>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {mode === "edit" ? "Update Borrower" : "Add New Borrower"}
          </button>
        </form>
      </div>

      {showResultModal && (
        <BorrowerModal
          onClose={() => {
            setShowResultModal(false);
            onSubmit(formData);
            onClose();
          }}
          loginID={createdLoginID}
          tempPassword={generatedPassword}
        />
      )}
    </div>

    
  );
};

export default BorrowerForm;
