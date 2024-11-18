import React, {useState} from 'react'
import 'katex/dist/katex.min.css';
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

const FixedPoint = () => {

    // state for the collapsible panel
  const [visible, setVisible] = useState(false)
  // State for the form inputs
  const [formData, setFormData] = useState({
    f: '',
    g: '',
    x0: '',
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
            <h2>Fixed Point</h2>
            <CButton color="primary" onClick={() => setVisible(!visible)} className="me-md-2">
              show/hide
            </CButton>
            <CCollapse visible={visible}>
              <FixedPoint></FixedPoint>
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
            <form onSubmit={handleSubmit}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="f">f</CInputGroupText>
                <CFormInput
                  placeholder="function F"
                  aria-label="function"
                  aria-describedby="function"
                  name='f'
                  value={formData.f}
                  onChange={handleChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="g">f</CInputGroupText>
                <CFormInput
                  placeholder="function G"
                  aria-label="function"
                  aria-describedby="function"
                  name='g'
                  value={formData.g}
                  onChange={handleChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="x0">a</CInputGroupText>
                <CFormInput
                  placeholder="Initial inference"
                  aria-label="x0"
                  aria-describedby="interval start"
                  name='x0'
                  value={formData.x0}
                  onChange={handleChange}
                />
              </CInputGroup>
              <CButton color="primary" type="submit" className="mb-3">Search for Root</CButton>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Visualization</strong>
          </CCardHeader>
          <CCardBody>
             {/* Display the response */}
            {response && (
              <div className="mt-3">
                <h5>Root Search Result</h5>

                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Approximate Root</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Iterations</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>{response.data.root}</CTableDataCell>
                      <CTableDataCell>{response.data.iterations}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>

                <h4>Iterations Table:</h4>
                <CTable columns={[
                  {
                    key: 'i',
                    label: 'Iterations',
                    _props: {scope: 'col'},
                  },
                  {
                    key: 'x_i',
                    label: 'Value for x',
                    _props: {scope: 'col'},
                  },
                  {
                    key: 'f_x_i',
                    label: 'Eval F Result',
                    _props: {scope: 'col'},
                  },
                  {
                    key: 'g_x_i',
                    label: 'Eval G Result',
                    _props: {scope: 'col'},
                  },
                  {
                    key: 'e',
                    label: 'Error',
                    _props: {scope: 'col'},
                  }
                ]} items={JSON.parse(response.data.df_result)}/>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FixedPoint