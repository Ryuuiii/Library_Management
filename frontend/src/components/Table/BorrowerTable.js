import React, { useState } from 'react';
import DotMenu from '../3DotMenu/DotMenu';
import './Table.css';
import BorrowerForm from '../Forms/BorrowerForm';

const BorrowerTable = ({ borrowers, onDeleteBorrower, onEditBorrower }) => {
  const [editBorrower, setEditBorrower] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handleEditBorrower = (borrower) => {
    setSelectedBorrower(borrower);
    setEditBorrower(true);
  };

  const handleDeleteBorrower = async (borrowerID) => {
    if (window.confirm("Are you sure you want to delete this borrower?")) {
      await onDeleteBorrower(borrowerID);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Borrower ID</th>
            <th>Email Address</th>
            <th>Name</th>
            <th>Borrower Type ID</th>
            <th>Year Level</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.length > 0 ? (
            borrowers.map((borrower) => (
              <tr key={borrower.BorrowerID}>
                <td>{borrower.BorrowerID}</td>
                <td>{borrower.EmailAddress}</td>
                <td>{borrower.Name}</td>
                <td>{borrower.BorrowerTypeID}</td>
                <td>{borrower.YearLevel}</td>
                <td className="last-cell">
                  {borrower.ProgramID}
                  <DotMenu
                    onEdit={() => handleEditBorrower(borrower)}
                    onDelete={() => handleDeleteBorrower(borrower.BorrowerID)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No Borrowers Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editBorrower && (
        <BorrowerForm
          onClose={() => setEditBorrower(false)}
          mode="edit"
          initialData={selectedBorrower}
          onSubmit={(updatedBorrower) => {
            onEditBorrower(updatedBorrower);
            setEditBorrower(false);
          }}
        />
      )}
    </div>
  );
};

export default BorrowerTable;
