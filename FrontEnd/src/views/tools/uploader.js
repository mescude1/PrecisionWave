import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvUploader = ({ apiEndpoint }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [xVector, setXVector] = useState([]);
  const [yVector, setYVector] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const { data } = results;
        const x = [];
        const y = [];

        data.forEach((row) => {
          if ('x' in row && 'y' in row) {
            x.push(Number(row.x));
            y.push(Number(row.y));
          }
        });

        setXVector(x);
        setYVector(y);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleProcess = async () => {
    if (!selectedMethod) {
      alert('Please select a method.');
      return;
    }

    if (xVector.length === 0 || yVector.length === 0) {
      alert('Please upload a valid CSV file.');
      return;
    }

    setIsProcessing(true);
    setResponse(null);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: selectedMethod,
          x: xVector,
          y: yVector,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error processing data:', error);
      alert('Failed to process the data. Check the console for more details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="csv-uploader">
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      <h3>Select Method</h3>
      <select value={selectedMethod} onChange={handleMethodChange}>
        <option value="">-- Select a Method --</option>
        <option value="method1">Method 1</option>
        <option value="method2">Method 2</option>
        <option value="method3">Method 3</option>
        <option value="method4">Method 4</option>
        <option value="method5">Method 5</option>
        <option value="method6">Method 6</option>
      </select>

      <button onClick={handleProcess} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Process'}
      </button>

      <h4>Preview</h4>
      {xVector.length > 0 && yVector.length > 0 ? (
        <div>
          <p><strong>X Vector:</strong> {xVector.join(', ')}</p>
          <p><strong>Y Vector:</strong> {yVector.join(', ')}</p>
        </div>
      ) : (
        <p>No data uploaded yet.</p>
      )}

      <h4>API Response</h4>
      {response ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : (
        <p>No response yet.</p>
      )}
    </div>
  );
};

export default CsvUploader;
