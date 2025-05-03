import React, { useState } from 'react'
import DotMenu from '../3DotMenu/DotMenu'
import BorrowerForm from '../Forms/BorrowerForm';
import './Table.css'

const BorrowerTable = ({borrowers, onDeleteBorrower, onEditBorrower}) => {
    const [editBorrower, setEditBorrower] = useState(false);
    const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handleEdit = (borrower) => {
    setSelectedBorrower(borrower)
    setEditBorrower(true)
  }

  const handleDelete = async (borrowerID) => {
    if(window.confirm("Are you sure you want to delete this borrower?")) {
      await onDeleteBorrower(borrowerID)
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Borrower ID</th>
            <th>Email Address</th>
            <th>Full Name</th>
            <th>Borrower Type ID</th>
            <th>Program Name</th>
            <th>Year Level</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.length > 0 ? (
            borrowers.map((borrower) => (
              <tr key={borrower.borrowerID}>
                <td>{borrower.borrowerID}</td>
                <td>{borrower.emailAddress}</td>
                <td>{borrower.fullName}</td>
                <td>{borrower.borrowerTypeID}</td>
                <td>{borrower.programName}</td>
                <td className='last-cell'>
                  <span>{borrower.yearLevel}</span>
                  <DotMenu
                    onEdit={() => handleEdit()}
                    onDelete={() => handleDelete()}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='8' className='no-data'>
                No Borrower Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editBorrower && (
        <BorrowerForm
          onClose={() => setEditBorrower(false)}
          mode='edit'
          initialData={selectedBorrower}
          onSubmit={(updateBorrower) => {
            onEditBorrower(updateBorrower)
            setEditBorrower(false)
          }}
        />
      )}
    </div>
  )
}

export default BorrowerTable