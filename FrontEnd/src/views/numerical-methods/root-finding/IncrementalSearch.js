import React from 'react'
import {InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const IncrementalSearch = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Incremental Search</h2>
            <p>Incremental search is a root-finding method that works by evaluating a function at successive intervals
              along its domain. The method aims to identify an interval where the function changes sign, indicating
              the presence of a root. This approach is based on the <strong>Intermediate Value Theorem</strong>, which
              states that for a continuous function <InlineMath math=" f(x)"/>, if <InlineMath math="f(a)"/> "/> and
              <InlineMath math="f(b)"/> have opposite signs, there exists at least one root in the interval
              <InlineMath math="[a, b]"/>.</p>

            <p>Here’s a step-by-step explanation of the incremental search method, followed by an example:</p>

            <h3>Steps in the Incremental Search Method</h3>
            <ol>
              <li>Choose an Initial Interval and Step Size:</li>
              <p>Start with an initial point, <InlineMath math=" x_0 "/>, and choose a small step size, <InlineMath
                math=" \Delta x "/>. The step size
                determines how closely you will sample the function values along the x-axis. Smaller step sizes can
                help detect more roots but increase computation time.</p>

              <li>Evaluate the Function at Each Step:</li>
              <p>Calculate the function value at each point, <InlineMath math=" f(x_0) "/>, <InlineMath
                math=" f(x_0 + \Delta x) "/>, <InlineMath math=" f(x_0 + 2\Delta x) "/>,
                and so on, by moving along the x-axis in increments of <InlineMath math=" \Delta x "/>.</p>

              <li>Check for a Sign Change</li>
              <p>At each step, check if the function value changes sign between successive points, indicating that
                <InlineMath math=" f(x) "/> has crossed the x-axis. A sign change implies that a root lies between those
                two points.</p>

              <li>Repeat or Stop:</li>
              <p>Continue this process until you either find an interval where a sign change occurs (indicating a root)
                or reach the boundary of the search range. If a sign change is detected, the interval can be used for
                further refinement (e.g., with bisection or another root-finding method).</p>
            </ol>
            <h3> Example of Incremental Search</h3>
            <p>Suppose we want to find a root of the function <InlineMath math=" f(x) = x^2 - 4 "/>, which has roots at
              <InlineMath math=" x = -2 "/> and <InlineMath math=" x = 2 "/>.</p>
            <ol>
              <li>Choose Initial Parameters**: Let’s start at <InlineMath math=" x_0 = 0 "/> with a step
                size <InlineMath math=" \Delta x = 1 "/>.
              </li>
              <li>Calculate Function Values:</li>
              <ul>
                <li>At <InlineMath math=" x = 0 "/>: <InlineMath math=" f(0) = 0^2 - 4 = -4 "/></li>
                <li>At <InlineMath math=" x = 1 "/>: <InlineMath math=" f(1) = 1^2 - 4 = -3 "/></li>
                <li>At <InlineMath math=" x = 2 "/>: <InlineMath math=" f(2) = 2^2 - 4 = 0 "/> (exact root found)</li>
                <li>Continuing:</li>
                <ul>
                  <li>At <InlineMath math=" x = 3 "/>: <InlineMath math=" f(3) = 3^2 - 4 = 5 "/></li>
                </ul>
              </ul>
              <li>Detect Sign Change:</li>
              <ul>
                <li>A sign change occurs between <InlineMath math=" x = 1 "/> (where <InlineMath math=" f(1) = -3 "/>)
                  and <InlineMath math=" x = 3 "/> (where <InlineMath math=" f(3) = 5 "/>). This suggests a root exists
                  between <InlineMath math=" x = 1 "/> and <InlineMath math=" x = 3 "/>.
                </li>
                <li>The exact root at <InlineMath math=" x = 2 "/> confirms this.</li>
              </ul>
            </ol>
            <h3>Summary</h3>
            <p>The incremental search method is straightforward and easy to implement, but it may miss roots if the
              step size is too large, especially if there are closely spaced roots. It’s typically useful for detecting
              intervals containing roots, after which a more precise method can be applied.</p>
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

export default IncrementalSearch