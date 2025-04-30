import React from "react";
import "./StatsCard.css";

const StatsCard = ({ icon, label, value, color }) => {
  return (
    <div className="stat-card" style={{ borderLeft: `6px solid ${color}` }}>
      <div className="stat-container">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
          <h4>{label}</h4>
          <p style={{ color: `${color}` }}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
