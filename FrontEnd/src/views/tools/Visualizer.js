import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CButton,
} from '@coreui/react';
import { LineChart, CartesianGrid, XAxis, Tooltip, YAxis, ReferenceLine, Line } from 'recharts';
import InstructionsTable from 'src/views/tools/instructions_table';
import { evaluate } from "mathjs";

const Visualizer = () => {
  const [functionDeclaration, setFunctionDeclaration] = useState('');
  const [dataSet, setDataSet] = useState([]);
  const [lowerBound, setLowerBound] = useState('-100');
  const [upperBound, setUpperBound] = useState('100');
  const [steps, setSteps] = useState(2);

  const calculatePoints = () => {
    if (!functionDeclaration) return;

    const parsedLowerBound = Number(lowerBound);
    const parsedUpperBound = Number(upperBound);

    try {
      const results = [];
      for (let x = parsedLowerBound; x < parsedUpperBound; x += steps) {
        // Replace 'x' with the current value in the loop
        const expression = functionDeclaration.replace(/x/g, x.toString());
        const y = evaluate(expression); // Ensure 'evaluate' is imported or implemented
        results.push({ x, y });
      }
      setDataSet(results);
    } catch (error) {
      console.error('Error calculating points:', error);
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setFunctionDeclaration(value);
  };

  const eventToNumber = (e) => {
    const value = e.currentTarget.value;
    return Number(value) || 0;
  };

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Instructions</strong>
          </CCardHeader>
          <CCardBody>
            <InstructionsTable />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Playground</strong>
          </CCardHeader>
          <CCardBody>
            <div className="flex items-center gap-2">
              <p>f(x)=</p>
              <CFormInput className="border-gray-300" onChange={handleOnChange} />
              <CButton onClick={calculatePoints}>Calculate</CButton>
            </div>

            <div className="flex items-center gap-2 mt-10">
              <div className="flex flex-col">
                <CFormLabel htmlFor="lower-bound">Lower bound</CFormLabel>
                <CFormInput
                  onChange={(e) => {
                    setLowerBound(e.currentTarget.value);
                  }}
                  value={lowerBound}
                  id="lower-bound"
                />
              </div>
              <div className="flex flex-col">
                <CFormLabel htmlFor="upper-bound">Upper bound</CFormLabel>
                <CFormInput
                  onChange={(e) => {
                    setUpperBound(e.currentTarget.value);
                  }}
                  value={upperBound}
                  id="upper-bound"
                  type="number"
                />
              </div>

              <div className="flex flex-col">
                <CFormLabel htmlFor="steps">Steps</CFormLabel>
                <CFormInput
                  onChange={(e) => {
                    setSteps(eventToNumber(e));
                  }}
                  value={steps}
                  id="steps"
                  type="number"
                />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Visualization</strong>
          </CCardHeader>
          <CCardBody>
            <LineChart
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
              width={1000}
              height={400}
              data={dataSet}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 'dataMax']} dataKey="x" tickMargin={8} />
              <Tooltip />
              <YAxis type="number" />
              <ReferenceLine strokeDasharray="3 3" y={0} label="Root" stroke="orange" />
              <Line
                dataKey="y"
                type="monotone"
                stroke="#8884d8"
                dot={{
                  fill: '#8884d8',
                }}
              />
            </LineChart>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Visualizer;
