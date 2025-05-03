import React from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight  } from "react-icons/md";

import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 6;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
        className='arrow-icon'
      >
        <MdKeyboardDoubleArrowLeft />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
        className='arrow-icon'
      >
        <MdKeyboardDoubleArrowRight/>
      </button>
    </div>
  );
};

export default Pagination;
