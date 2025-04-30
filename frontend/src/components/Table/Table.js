import React from 'react';
import './Table.css';

const Table = ({ columns = [], rows = [], showDotMenu = false, renderAction }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '1.5rem' }}>
              No data available
            </td>
          </tr>
        ) : (
          rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td key={colIdx}>
                  {colIdx === row.length - 1 && showDotMenu ? (
                    <div className="status-cell">
                      <span>{cell}</span>
                      {renderAction ? renderAction(row, rowIdx) : null}
                    </div>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
