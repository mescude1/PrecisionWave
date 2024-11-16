import React, {useState} from 'react'
import axios from 'axios';
import {InlineMath, BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'


const Bisection = () => {
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
      const res = await axios.post('http://localhost:8000/methods/bisection', formData);
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
              <h2>Bisection</h2>
              <p>The <strong>bisection method</strong> is a numerical technique for finding roots that refines an
                interval
                containing the root until it becomes sufficiently small. The method is based on the <strong>Intermediate
                  Value Theorem</strong>,
                which ensures that for a continuous function <InlineMath math=" f(x) "/>, if <InlineMath
                  math=" f(a) "/> and <InlineMath math=" f(b) "/> have opposite signs,
                there must be at least one root within the interval <InlineMath math="[a, b]"/>.</p>

              <p>The bisection method works by iteratively halving the interval and selecting the sub-interval that
                contains
                the root. Here’s a detailed explanation of the bisection method steps and an example.</p>

              <h3>Steps in the Bisection Method</h3>
              <ol>
                <li>Initial Interval Selection:</li>
                <ul>
                  <li>Choose an interval <InlineMath math="[a, b]"/> where <InlineMath math=" f(a) "/> and <InlineMath
                    math=" f(b) "/> have opposite signs (i.e., <InlineMath math=" f(a) \cdot f(b) < 0 "/>). This sign
                    change implies that there is at least one root in <InlineMath math="[a, b]"/>.
                  </li>
                </ul>
                <li>Compute the Midpoint:</li>
                <ul>
                  <li>Calculate the midpoint <InlineMath math=" c "/> of the interval:
                    <BlockMath math="c = \frac{a + b}{2}"/>
                  </li>
                  <li>Evaluate <InlineMath math=" f(c) "/>, the function value at <InlineMath math=" c "/>.</li>
                </ul>
                <li>Determine the New Interval:</li>
                <ul>
                  <li>If <InlineMath math=" f(c) = 0 "/>, then <InlineMath math=" c "/> is the root, and the method
                    stops.
                  </li>
                  <li>If <InlineMath math=" f(a) \cdot f(c) < 0 "/>, the root lies in the interval <InlineMath
                    math="[a, c]"/>. Set <InlineMath math=" b = c "/>.
                  </li>
                  <li>If <InlineMath math=" f(b) \cdot f(c) < 0 "/>, the root lies in the interval <InlineMath
                    math="[c, b]"/>. Set <InlineMath math=" a = c "/>.
                  </li>
                </ul>
                <li>Repeat Until Convergence:</li>
                <ul>
                  <li>Continue this process until the interval <InlineMath math="[a, b]"/> is sufficiently small (i.e.,
                    the difference <InlineMath math=" b - a "/> is within a chosen tolerance level).
                  </li>
                  <li>Once the interval is small enough, <InlineMath math=" c "/> is taken as an approximation of the
                    root.
                  </li>
                </ul>
              </ol>
              <h3>Example of the Bisection Method</h3>

              <p>Let’s find a root of the function <InlineMath math=" f(x) = x^2 - 4 "/> within the interval <InlineMath
                math="[1, 3]"/>.</p>
              <ol>
                <li>Initial Interval**: We start with <InlineMath math="[a, b] = [1, 3]"/>.</li>
                <ul>
                  <li><InlineMath math=" f(1) = 1^2 - 4 = -3 "/></li>
                  <li><InlineMath math=" f(3) = 3^2 - 4 = 5 "/></li>
                  <li> Since <InlineMath math=" f(1) "/> and <InlineMath math=" f(3) "/> have opposite signs, there is a
                    root in <InlineMath math="[1, 3]"/>.
                  </li>
                </ul>
                <li>First Iteration:</li>
                <ul>
                  <li>Calculate the midpoint: <InlineMath math=" c = \frac{1 + 3}{2} = 2 "/>.</li>
                  <li>Evaluate <InlineMath math=" f(2) = 2^2 - 4 = 0 "/>.</li>
                  <li>Since <InlineMath math=" f(2) = 0 "/>, we have found an exact root at <InlineMath math=" x = 2 "/>.
                  </li>
                </ul>
                <li>Result:</li>
                <ul>
                  <li>In this case, the bisection method converged quickly because <InlineMath math=" x = 2 "/> is an
                    exact root of the function.
                  </li>
                </ul>
              </ol>
              <p>If <InlineMath math=" f(c) "/> had been non-zero, we would continue halving the interval as described
                until reaching the
                desired accuracy.</p>
              <h3>Summary</h3>

              <p>The bisection method is guaranteed to converge as long as the function is continuous and the initial
                interval contains a root (sign change). It is reliable but can be slower than other methods because it
                systematically halves the interval without estimating the root’s location based on slope or other
                properties of the function. Nonetheless, it’s widely used due to its simplicity and robustness.</p>
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
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="a">a</CInputGroupText>
                  <CFormInput
                    placeholder="Interval Start"
                    aria-label="a"
                    aria-describedby="interval start"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="b">b</CInputGroupText>
                  <CFormInput
                    placeholder="Interval End"
                    aria-label="b"
                    aria-describedby="inverval end"
                  />
                </CInputGroup>
                <CButton color="primary" type="submit" className="mb-3">Search for Root</CButton>
              </form>

              {/* Display the response */}
              {response && (
                <div className="mt-3">
                  <h5>Root Search Result</h5>
                  <p>Approximate Root: {response.root}</p>
                  <p>Iterations: {response.iterations}</p>
                  <p>Error: {response.error}</p>
                </div>
              )}

              {/* Display error message */}
              {error && (
                <div className="mt-3 text-danger">
                  <p>{error}</p>
                </div>
              )}

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

export default Bisection