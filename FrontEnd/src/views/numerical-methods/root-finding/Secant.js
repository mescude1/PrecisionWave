import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react'
import axios from "axios";
import SecantTheory from "src/views/numerical-methods/theory/secant_theory";

const Secant = () => {

  // state for the collapsible panel
  const [visible, setVisible] = useState(false)
  // State for the form inputs
  const [formData, setFormData] = useState({
    f: '',
    x0: '',
    x1: '',
  });

  // State for the response data
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Handle changes to the input fields
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on new submission
    try {
      const res = await axios.post('https://precision-wave.azuloso.me/methods/fixed-point', formData, {
        headers: {'Content-Type': 'application/json'}
      });
      setResponse(res.data); // Set the response data
    } catch (err) {
      setError('Error finding root. Please check your input and try again.');
      setResponse(null); // Clear any previous response
      console.error('Error finding root:', err);
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
            <h2>Secant</h2>
            <CButton color="primary" onClick={() => setVisible(!visible)} className="me-md-2">
              show/hide
            </CButton>
            <CCollapse visible={visible}>
              <SecantTheory></SecantTheory>
            </CCollapse>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Playground</strong>
          </CCardHeader>
          <CCardBody>

          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Visualization</strong>
          </CCardHeader>
          <CCardBody>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Secant