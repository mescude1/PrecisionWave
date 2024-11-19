import React, {useState} from 'react';
import {CFormInput} from "@coreui/react";

function VectorInput({ size, onChange }) {
  const [values, setValues] = useState(Array(size).fill(0)); // Initialize vector with zeros

  const handleVectorChange = (index, value) => {
    const updatedValues = values.map((v, i) => (i === index ? value : v)); // Update the specific index
    setValues(updatedValues); // Update local state
    onChange(updatedValues); // Pass updated vector to parent
  };

  return (
    <div>
      <h3>Vector Input</h3>
      {Array.from({ length: size }, (_, index) => (
        <CFormInput
          key={index}
          type="number"
          onChange={(e) => handleVectorChange(index, e.target.value)}
          style={{ width: '50px', margin: '5px', display: 'inline' }}
        />
      ))}
    </div>
  );
}

export default VectorInput;
