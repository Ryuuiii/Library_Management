import React from 'react'
import DotMenu from '../3DotMenu/DotMenu'
import './Table.css'

const BorrowerTable = () => {
  return (
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
            <DotMenu/>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default BorrowerTable