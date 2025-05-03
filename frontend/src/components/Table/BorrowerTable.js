import React, { useState } from 'react'
import DotMenu from '../3DotMenu/DotMenu'
import './Table.css'
import BorrowerForm from '../Forms/BorrowerForm';

const BorrowerTable = ({onDeleteBorrower, onEditBorrower}) => {
    const [editBorrower, setEditBorrower] = useState(false);
    const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handleEdit = (borrower) => {
    setSelectedBorrower(borrower)
    setEditBorrower(true)
  }

  const handleDelete = async (borrowerID) => {
    if(window.confirm("Are you sure you want to delete this book?")) {
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
          <tr>
            <td>0123004567</td>
            <td>ytrose2704val@student.fatima.edu.ph</td>
            <td>John Dela</td>
            <td>ST01</td>
            <td>BSCS</td>
            <td className='last-cell'>
              <span>2</span>
              <DotMenu
                onEdit={() => handleEdit()}
                onDelete={() => handleDelete()}
              />
            </td>
          </tr>
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