import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import BLayout from '../../components/Layout/BLayout';
import anon from '../../assets/anon.png';
import './Profile.css';

const Profile = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');  // State for success/error message
  const [messageType, setMessageType] = useState('');  // To manage message color (error or success)



 const [profileData, setProfileData] = useState({
  name: '',
  BorrowerID: '',
  Emailaddress: '',
  YearLevel: '',
  ProgramID: '',
  BorrowerTypeID: ''
});


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost/Library_Management/backend/api/Profile.php', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (!data.error) {
  setProfileData({
    BorrowerID: data.BorrowerID,
    name: data.name,
    Emailaddress: data.email,
    YearLevel: data.yearLevel,
    ProgramID: data.programID,
    BorrowerTypeID: data.borrowerTypeID
  });
} else {
  setMessage(data.error);
  setMessageType('error');
}
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchProfile();
  }, []);

  const handlePasswordSave = async () => {
  if (newPassword !== confirmPassword) {
    setMessage('New passwords do not match.');
    setMessageType('error');
    return;
  }

  try {
    const response = await fetch('http://localhost/Library_Management/backend/api/b_change_password.php', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
});

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
    }

    const result = await response.json();

    if (result.success) {
      setMessage('Password updated successfully.');
      setMessageType('success');
      setTimeout(() => setIsEditingPassword(false), 2000);
    } else {
      setMessage(result.error || 'Unknown error occurred.');
      setMessageType('error');
    }
  } catch (error) {
    setMessage('An error occurred while updating password.');
    setMessageType('error');
    console.error(error);
  }

  setOldPassword('');
  setNewPassword('');
  setConfirmPassword('');
};


  return (
    <BLayout title="Profile">
      <div className="profile-container">
        <main className="main-content">
          <h2 className="section-title">PROFILE</h2>
          <div className="notifi">
            <Link to="/borrower/notification" className="notification-icon" title="You have received a new notification">
              🔔
            </Link>
          </div>

          <div className="profile-card">
            <h3 className="welcome-msg">WELCOME TO LIBSYNC, {profileData.name}</h3>

            <div className="profile-info">
              <div className="profile-image">
                <img src={anon} alt="anon" />
              </div>

              <div className="info-fields">
                <div><strong>Full name</strong></div>
                <div><strong>Borrower ID</strong></div>
                <div><strong>Email address</strong></div>

                <div className="info-fields2">
                <div><br />{profileData.name}</div>
                <div><br />{profileData.BorrowerID}</div>
                <div><br />{profileData.Emailaddress}</div>
                </div>
              </div>
            </div>

            <div className="Pass">
              <strong>Password</strong><br />
              ********************
              <button className="edit-btn" onClick={() => setIsEditingPassword(true)}>✎</button>
            </div>
          </div>

          {isEditingPassword && (
            <div className="password-modal">
              <h4 className="password-header">Do you want to change your password?</h4>
              <div className="password-body">
                {message && (
                  <p className={`message ${messageType}`}>{message}</p>
                )}

                <label>
                  Type Old Password:
                  <input
                    type="password"
                    className="password-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old password"
                  />
                </label>
                <label>
                  Enter New Password:
                  <input
                    type="password"
                    className="password-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                  />
                </label>
                <label>
                  Confirm New Password:
                  <input
                    type="password"
                    className="password-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </label>
              </div>
              <div className="password-buttons">
                <button className="cancel-btn" onClick={() => setIsEditingPassword(false)}>Cancel</button>
                <button className="save-btn" onClick={handlePasswordSave}>Save</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </BLayout>
  );
};

export default Profile;