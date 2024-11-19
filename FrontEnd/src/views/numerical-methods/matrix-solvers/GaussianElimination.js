import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import GaussianEliminationTheory from "src/views/numerical-methods/theory/gaussian_elimination_theory";
import MatrixInput from "src/views/numerical-methods/matrixInput";
import VectorInput from "src/views/numerical-methods/vectorInput";
import axios from "axios";


const GaussianElimination = () => {

  const [size, setSize] = useState(2);  // Default matrix size
  const [matrix, setMatrix] = useState(Array(size).fill(Array(size).fill(0)));
  const [vector, setVector] = useState(Array(size).fill(0));
  const [pivot, setPivot] = useState(['partial'])
  const [result, setResult] = useState(null);

  const handleMatrixChange = (updatedMatrix) => setMatrix(updatedMatrix);
  const handleVectorChange = (updatedVector) => setVector(updatedVector);
  const handleSelectChange = (updatedSelect) => setPivot(updatedSelect)

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://precision-wave.azuloso.me/methods/gaussian-elimination', { matrix, vector, pivot });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error with API call:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Gaussian Elimination</h2>
          <GaussianEliminationTheory/>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Playground</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Matrix and Vector Input</h2>

             <CFormSelect aria-label="pivot" value={pivot} onChange={handleSelectChange}>
                <option>Select a pivoting strategy:</option>
                <option value="full">One</option>
                <option value="partial">Two</option>
                <option value="none">Three</option>
              </CFormSelect>

            <h3>Matrix Size:</h3>

            <CInputGroup className="mb-3">
                <CInputGroupText id="size">Matrix Size</CInputGroupText>
                <CFormInput
                  type="number"
                  value={size}
                  min="2"
                  onChange={(e) => {
                  const newSize = parseInt(e.target.value, 10);
                  setSize(newSize);
                  setMatrix(Array(newSize).fill(Array(newSize).fill(0)));
                  setVector(Array(newSize).fill(0));
                }}
                />
            </CInputGroup>

            <MatrixInput size={size} onChange={handleMatrixChange}/>
            <VectorInput size={size} onChange={handleVectorChange}/>

            <h3></h3>

            <CButton color="primary" type="submit" className="mb-3" onClick={handleSubmit}>Solve System</CButton>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Visualization</strong>
          </CCardHeader>
          <CCardBody>
            {result && (
              <div>
                <h2>Response Vector:</h2>
                <pre>{JSON.stringify(result)}</pre>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GaussianElimination