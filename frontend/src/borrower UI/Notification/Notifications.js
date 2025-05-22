import React, { useEffect, useState } from "react";
import BLayout from '../../components/Layout/BLayout';
import './Notifications.css';

const Notifications = () => {
  const [notificationsData, setNotificationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginID = localStorage.getItem('loginID');


  const fetchNotifications = async () => {
  try {
    const response = await fetch('http://localhost/Library_Management/backend/api/Notifications.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ loginID })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      setNotificationsData(data);
    } else {
      setNotificationsData([
        { message: "No notifications found." }
      ]);
    }

    setLoading(false);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    setError(`Failed to load notifications: ${err.message}`);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <BLayout title="Notifications">
      <div className="notifications-page">
        <h1>NOTIFICATIONS</h1>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : error ? (
          <div className="error-banner">
            {error} - <button onClick={fetchNotifications}>Retry</button>
          </div>
        ) : notificationsData.length === 0 ? (
          <div className="empty-state"></div>
        ) : (
          <div className="notifications-list">
            {notificationsData.map((note, idx) => (
              <div className="notification" key={idx}>
                <div className="notification-header">
                  <span className="indicator-dot"></span>
                </div>
                <p className="message">{note.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </BLayout>
  );
};

export default Notifications;
