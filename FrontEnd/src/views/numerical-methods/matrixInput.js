import React, {useState} from 'react';
import {CFormInput} from "@coreui/react";

function MatrixInput({ size, onChange }) {
  const [values, setValues] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(0)) // Default 2D array for matrix
  );

  const handleMatrixChange = (rowIndex, colIndex, value) => {
    const updatedValues = values.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );

    setValues(updatedValues); // Update local state
    onChange(updatedValues); // Pass updated matrix to parent
  };

  return (
    <div>
      <h3>Matrix Input</h3>
      {Array.from({ length: size }, (_, row) => (
        <div key={row} style={{ display: 'flex' }}>
          {Array.from({ length: size }, (_, col) => (
            <CFormInput
              key={`${row}-${col}`}
              type="number"
              onChange={(e) => handleMatrixChange(row, col, e.target.value)}
              style={{ width: '50px', margin: '5px' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatrixInput;
