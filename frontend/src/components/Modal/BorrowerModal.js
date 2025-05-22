import React from 'react'
import './ModalStyles.css'

const BorrowerModal = ({onClose}) => {
  return (
    <section className='borrower-modal'>
      <div className='borrower-content'>
        <h2>✅Borrower Created Successfully</h2>
        <div className='info-input'>
          <label>Login ID:</label>
          <p>01230007849</p>
        </div>

        <div className='info-input'>
          <label>Temporary Password:</label>
          <p>27xAYE0R</p>
        </div>
          
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </section>
  )
}

export default BorrowerModal