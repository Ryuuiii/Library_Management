import React from 'react'
import DotMenu from '../3DotMenu/DotMenu'
import './Table.css'

const BookTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Published Year</th>
          <th>Subject</th>
          <th>Program ID</th>
          <th>Year Level</th>
          <th>Available Copies</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>LRC-I-C-7053</td>
          <td>Programming Language: Principle and Practices</td>
          <td>Hector Practices</td>
          <td>2019</td>
          <td>Intermediate Programming</td>
          <td>CS01</td>
          <td>2</td>
          <td className='last-cell'>
            <span>1</span>
            <DotMenu/>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default BookTable