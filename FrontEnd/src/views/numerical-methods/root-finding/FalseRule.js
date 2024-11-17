import React, {useState} from 'react'
import axios from 'axios';
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
import False_rule_theory from "src/views/numerical-methods/theory/false_rule_theory";
import FalseRuleTheory from "src/views/numerical-methods/theory/false_rule_theory";

const FalseRule = () => {

  // state for the collapsible panel
  const [visible, setVisible] = useState(false)
  // State for the form inputs
  const [formData, setFormData] = useState({
    f: '',
    a: '',
    b: '',
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
      const res = await axios.post('https://precision-wave.azuloso.me/methods/false-rule', formData, {
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
            <h2>False Rule</h2>
            <CButton color="primary" onClick={() => setVisible(!visible)} className="me-md-2">
              show/hide
            </CButton>
            <CCollapse visible={visible}>
              <FalseRuleTheory></FalseRuleTheory>
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
                  placeholder="function"
                  aria-label="function"
                  aria-describedby="function"
                  name='f'
                  value={formData.f}
                  onChange={handleChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="a">a</CInputGroupText>
                <CFormInput
                  placeholder="Interval Start"
                  aria-label="a"
                  aria-describedby="interval start"
                  name='a'
                  value={formData.a}
                  onChange={handleChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="b">b</CInputGroupText>
                <CFormInput
                  placeholder="Interval End"
                  aria-label="b"
                  aria-describedby="inverval end"
                  name='b'
                  value={formData.b}
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
                    label: 'Eval Result',
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

export default FalseRule