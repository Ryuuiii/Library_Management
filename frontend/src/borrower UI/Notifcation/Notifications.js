import React from "react";
import BLayout from '../../components/Layout/BLayout'
import './Notifications.css';

const notificationsData = [
  {
    date: "Today",
    message: "Your borrowed book (Empowerment Technologies) is overdue. Please return it as soon as possible.",
  },
  {
    date: "Yesterday",
    message: "Please return your borrowed book [Empowerment Technologies] today.",
  },
];

const Notifications = () => {
  return (
    <BLayout title="Notifications">
      <div className="notifications-page">
        <h1>NOTIFICATIONS</h1>
        <div className="notifications-list">
          {notificationsData.map((note, idx) => (
            <div className="notification" key={idx}>
              <p className="date">{note.date}</p>
              <p className="message">
                <span className="dot"></span>
                {note.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BLayout>
  );
};

export default Notifications;