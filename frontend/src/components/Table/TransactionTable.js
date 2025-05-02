import React from 'react'
import DotMenu from '../3DotMenu/DotMenu'
import './Table.css'

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Borrower ID</th>
          <th>Book ID</th>
          <th>Transaction Type</th>
          <th>Borrow Date</th>
          <th>Due Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>T001</td>
          <td>01230004567</td>
          <td>LRC-I-C-7053</td>
          <td>Borrowed</td>
          <td>2025-04-01</td>
          <td>2025-04-03</td>
          <td>2025-04-05</td>
          <td className='last-cell'>
            <span>
              Returned <br/>
              [Overdue]
            </span>
            <DotMenu/>
          </td>

        </tr>
      </tbody>
    </table>
  )
}

export default Table