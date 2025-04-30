import React from "react";
import "./DotMenu.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const DotMenu = ({onEdit, onDelete}) => {
  return (
    <div className="dot-menu-dropdown">
      <BsThreeDotsVertical className="dot-menu" />
      <div className="dropdown-content">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DotMenu;
