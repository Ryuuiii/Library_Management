import React from 'react'
import './ModalStyles.css'

const BorrowerModal = ({onClose, loginID, tempPassword}) => {
  return (
    <section className='borrower-modal'>
      <div className='borrower-content'>
        <h2>✅Borrower Created Successfully</h2>
        <div className='info-input'>
          <label>Login ID:</label>
          <p>{loginID}</p>
        </div>

        <div className='info-input'>
          <label>Temporary Password:</label>
          <p>{tempPassword}</p>
        </div>
          
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </section>
  )
}

export default BorrowerModal