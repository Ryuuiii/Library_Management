import React from 'react'
import './ModalStyles.css'

const AdminModal = ({onClose, loginID, tempPassword}) => {
  return (
    <section className='admin-modal'>
      <div className='admin-content'>
        <h2>✅Admin Created Successfully</h2>
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

export default AdminModal