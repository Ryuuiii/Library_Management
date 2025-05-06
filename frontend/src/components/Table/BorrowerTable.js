import React from 'react';
import './Table.css';

const BorrowerTable = ({ borrowers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Borrower ID</th>
          <th>Name</th>
          <th>Email Address</th>
          <th>Year Level</th>
          <th>Program ID</th>
          <th>Borrower Type</th>
        </tr>
      </thead>
      <tbody>
        {borrowers.map((borrower) => (
          <tr key={borrower.BorrowerID}> {/* Add a unique key here */}
            <td>{borrower.BorrowerID}</td>
            <td>{borrower.Name}</td>
            <td>{borrower.EmailAddress}</td>
            <td>{borrower.YearLevel}</td>
            <td>{borrower.ProgramID}</td>
            <td>{borrower.BorrowerTypeID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BorrowerTable;