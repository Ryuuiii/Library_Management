import { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import ALayout from '../../components/Layout/ALayout';
import './Profile.css';




const Profile = () => {
  const [showEditPass, setShowEditPass] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleForm = () => {
    setShowEditPass(!showEditPass)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Current profileData:', profileData);
console.log('Submitting change for id:', profileData.loginID);
console.log('Sending password change for loginID:', profileData.loginID);



  const { currentPassword, newPassword, confirmPassword } = formData;

  if (newPassword !== confirmPassword) {
    setError('New password and confirm password do not match.');
    setTimeout(() => setError(''), 3000);
    return;
  }
  
  setError('');
  try {
    const res = await fetch('http://localhost/api/change_password.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loginID: profileData.loginID,
        currentPassword,
        newPassword
      })
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setTimeout(() => setError(''), 3000);
    } else {
      alert('Password changed successfully!');
      setShowEditPass(false);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  } catch (err) {
    setError('Failed to change password.');
    setTimeout(() => setError(''), 3000);
  }
};

  const [profileData, setProfileData] = useState({
    loginID: '',
    id: '',
    name: '',
    role: '',
    password: ''
  });
  
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost/api/admin_profile.php', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.error) {
        setProfileData({
          loginID: data.loginID,  
          id: data.id,
          name: data.name,
          role: data.role,
          password: ''
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);


  return (
    <ALayout title="Profile">
      <main className="admin-profile">
        <div className="header">
          <h1>Welcome To Libsync {profileData.name}</h1>
          <button className="edit-button" onClick={handleForm}>
            <CiEdit size={20} /> Edit Password
          </button>
        </div>

        

        {!showEditPass && (
          <div className="profile-view">
          <div className="profile-field">
            <label>Admin ID:</label>
            <p>{profileData.id}</p>
          </div>

          <div className="profile-field">
            <label>Name:</label>
            <p>{profileData.name}</p>
          </div>

          <div className="profile-field">
            <label>Role:</label>
            <p>{profileData.role}</p>
          </div>

          <div className="profile-field">
            <label>Password:</label>  
            <p>••••••••</p>
          </div>
        </div>
        )}


        {showEditPass && (
          <form className="profile-edit" onSubmit={handleSubmit}>
            <div className="profile-field">
              <label className="label" htmlFor="name">Name:</label>
              <input type="text" name="name" value={profileData.name} disabled/>
            </div>

            <div className="profile-field">
              <label className="label" htmlFor="role">Role:</label>
              <input type="text" name="role" value={profileData.role} disabled />
            </div>

            <div className="profile-field">
              <label>Old Password:</label>
              <div className='password-group'>
                <input 
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword" 
                  placeholder="Enter current password"
                  value={formData.currentPassword} 
                  onChange={handleChange}
                />
                <span onClick={() => setShowCurrent(!showCurrent)}>
                  {showCurrent ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/>}
                </span>
              </div>
            </div>

            <div className="profile-field">
              <label>New Password:</label>
              <div className='password-group'>
                <input 
                  type={showNew ? "text" : "password"}
                  name="newPassword" 
                  placeholder="Enter new password"
                  value={formData.newPassword} 
                  onChange={handleChange}
                />
                <span onClick={() => setShowNew(!showNew)}>
                  {showNew ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/>}
                </span>
              </div>
            </div>

            <div className="profile-field">
              <label>Confirm Password:</label>
              <div className='password-group'>
                <input 
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword" 
                  placeholder="Enter confirm new password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange}
                />
                <span onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <IoEyeOutline size={20}/> : <IoEyeOffOutline size={20}/>}
                </span>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="password-buttons">
              <button type="button" className="cancel-button" onClick={handleForm}>Cancel</button>
              <button type="submit" className="save-button">Save Changes</button>
            </div>
          </form>
        )}
      </main>
    </ALayout>
  );
};

export default Profile;
