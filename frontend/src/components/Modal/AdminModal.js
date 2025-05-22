import React from 'react'
import './ModalStyles.css'

const AdminModal = ({onClose}) => {
  return (
    <section className='admin-modal'>
      <div className='admin-content'>
        <h2>✅Admin Created Successfully</h2>
        <div className='info-input'>
          <label>Login ID:</label>
          <p>A001</p>
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

export default AdminModal