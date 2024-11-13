import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const FalseRule = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>False Rule</h2>
            <p>The <strong>false position method</strong> (or <strong>regula falsi</strong> method) is a root-finding
              algorithm that combines aspects of the bisection method with linear interpolation to locate roots of a
              continuous function <InlineMath math=" f(x) "/>. Like the bisection method, it requires an initial
              interval <InlineMath math="[a, b]"/>
              where <InlineMath math=" f(a) "/> and <InlineMath math=" f(b) "/> have opposite signs (indicating a root
              exists between them). However,
              instead of simply bisecting the interval, the false position method uses a line through <InlineMath
                math="(a, f(a))"/>
              and <InlineMath math="(b, f(b))"/> to approximate the root.</p>

            <h3>Steps in the False Position Method</h3>
            <ol>
              <li>Select Initial Interval:</li>
              <ul>
                <li> Choose an interval <InlineMath math="[a, b]"/> where <InlineMath math=" f(a) "/> and <InlineMath
                  math=" f(b) "/> have opposite signs, i.e., <InlineMath math=" f(a) \cdot
                f(b) < 0 "/>. This ensures that a root exists within <InlineMath math="[a, b]"/> due to the Intermediate
                  Value Theorem.
                </li>
              </ul>
              <li>Compute the Point of Intersection:</li>
              <ul>
                <li> Draw a secant line between <InlineMath math="(a, f(a))"/> and <InlineMath math="(b, f(b))"/>, and
                  find where it crosses the x-axis
                  (where <InlineMath math=" f(x) = 0 "/> is approximated by the linear interpolation).
                </li>
                <li> The intersection point <InlineMath math=" c "/> is given by:</li>
                <BlockMath math="c = b - \frac{f(b) \cdot (b - a)}{f(b) - f(a)}"/>
                <li><InlineMath math=" c "/> is an estimate for the root within the interval.</li>
              </ul>
              <li>Evaluate <InlineMath math=" f(c) "/>:</li>
              <ul>
                <li> Calculate <InlineMath math=" f(c) "/>, the function value at the point <InlineMath math=" c "/>.
                </li>
              </ul>
              <li>Update the Interval:</li>
              <ul>
                <li> If <InlineMath math=" f(c) = 0 "/>, then <InlineMath math=" c "/> is the root, and the method
                  stops.
                </li>
                <li> If <InlineMath math=" f(a) \cdot f(c) < 0 "/>, the root lies in the interval <InlineMath
                  math="[a, c]"/>. Set <InlineMath math=" b = c "/>.
                </li>
                <li> If <InlineMath math=" f(b) \cdot f(c) < 0 "/>, the root lies in the interval <InlineMath
                  math="[c, b]"/>. Set <InlineMath math=" a = c"/>.
                </li>
                <li> Unlike the bisection method, only one endpoint of the interval is updated based on which
                  sub-interval contains the root.
                </li>
              </ul>
              <li>Repeat Until Convergence:</li>
              <ul>
                <li> Continue iterating until <InlineMath math=" f(c) "/> is sufficiently close to zero (or the interval
                  width is small enough to meet a chosen tolerance level).
                </li>
              </ul>
            </ol>
            <h3>Example of the False Position Method</h3>

            <p>Consider finding a root of <InlineMath math=" f(x) = x^2 - 4 "/> within the interval <InlineMath
              math="[1, 3]"/>.</p>
            <ol>
              <li>Select Initial Interval**: We start with <InlineMath math="[a, b] = [1, 3]"/>.</li>
              <ul>
                <li><InlineMath math=" f(1) = 1^2 - 4 = -3 "/></li>
                <li><InlineMath math=" f(3) = 3^2 - 4 = 5 "/></li>
                <li> Since <InlineMath math=" f(1) "/> and <InlineMath math=" f(3) "/> have opposite signs, there is a
                  root in <InlineMath math="[1, 3]"/>.
                </li>
              </ul>
              <li>First Iteration:</li>
              <ul>
                <li> Calculate <InlineMath math=" c "/> using the formula:</li>
                <BlockMath math="c = 3 - \frac{5 \cdot (3 - 1)}{5 - (-3)} = 3 - \frac{10}{8} = 1.75"/>
                <li> Evaluate <InlineMath math=" f(1.75) = (1.75)^2 - 4 = -0.9375 "/>.</li>
              </ul>
              <li>Update Interval:</li>
              <ul>
                <li> Since <InlineMath math=" f(1) "/> and <InlineMath math=" f(1.75) "/> have opposite signs, the root
                  lies in <InlineMath math="[1.75, 3]"/>. Set <InlineMath math=" a = 1.75 "/>.
                </li>
              </ul>
              <li>Repeat:</li>

              <p> We continue updating <InlineMath math=" a "/> or <InlineMath math=" b "/> in the same way,
                recalculating <InlineMath math=" c "/> and testing <InlineMath math=" f(c) "/>, until the function value
                at <InlineMath math=" c "/> is close enough to zero.</p>

            </ol>
            <h3>Summary</h3>

            <p>The false position method can be faster than bisection in some cases because it uses linear interpolation
              to "guess" the location of the root within the interval. However, it can sometimes get "stuck" if one end
              of the interval doesn’t move, especially if the function's slope is steep on one side of the interval.
              It’s often a good choice when there is a consistent slope in the function across the interval but can be
              less reliable if the function changes rapidly near one endpoint.</p>
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

export default FalseRule