import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const FixedPoint = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Fixed Point</h2>
            <p>The <strong>fixed-point iteration</strong> method is a root-finding technique that transforms the
              root-finding problem into finding a fixed point of a function. A fixed point of a function <InlineMath
                math=" g(x) "/>
              is a point <InlineMath math=" x = p "/> such that <InlineMath math=" g(p) = p "/>. In fixed-point
              iteration, we reformulate the original
              equation <InlineMath math=" f(x) = 0 "/> as <InlineMath math=" x = g(x) "/> and then iteratively solve
              for <InlineMath math=" x "/>.</p>

            <h3>Steps in the Fixed-Point Iteration Method</h3>
            <ol>
              <li>Reformulate the Equation:</li>
              <ul>
                <li> Rewrite the equation <InlineMath math=" f(x) = 0 "/> in the form <InlineMath math=" x = g(x) "/>.
                  This step is critical as the method only works
                  if the reformulation results in a convergent process. The choice of <InlineMath
                    math=" g(x) "/> affects whether the iterations will
                  converge or diverge.
                </li>
              </ul>
              <li>Choose an Initial Guess:</li>
              <ul>
                <li> Start with an initial guess, <InlineMath math=" x_0 "/>, that is reasonably close to the expected
                  root.
                </li>
              </ul>
              <li>Iterate Using <InlineMath math=" g(x) "/>:</li>
              <ul>
                <li> Use the iterative formula:</li>
                <BlockMath math="x_{n + 1} = g(x_n)"/>
                <li> For each iteration, calculate the next approximation of <InlineMath math=" x "/> by substituting
                  the current value of <InlineMath math=" x"/>
                  into <InlineMath math=" g(x) "/>.
                </li>
              </ul>
              <li>Check for Convergence:</li>
              <ul>
                <li> Continue iterating until the difference between successive values is smaller than a chosen
                  tolerance level
                  (i.e., <InlineMath math=" |x_{n + 1} - x_n| "/> is very small), or until <InlineMath
                    math=" g(x) "/> and <InlineMath math=" x "/> are sufficiently close to each
                  other.
                </li>
              </ul>
              <li>Stop if Convergence is Achieved:</li>
              <ul>
                <li> When the sequence of iterates <InlineMath math=" x_0, x_1, x_2, \ldots "/> converges, the final
                  value is taken as the
                  approximate root of the original function.
                </li>
              </ul>
            </ol>
            <h3>Example of Fixed-Point Iteration</h3>

            <p>Suppose we want to find a root of the equation <InlineMath math=" f(x) = x^2 - 4 = 0 "/>, which has roots
              at <InlineMath math=" x = 2 "/> and <InlineMath math=" x = -2 "/>. We can rewrite this equation in the
              form <InlineMath math=" x = g(x) "/> for fixed-point iteration. One possible form is:</p>

            <BlockMath math="x = g(x) = \sqrt{4}"/>
            <p>or alternatively:</p>
            <BlockMath math="x = g(x) = \frac{x^2 + 4}{2}"/>

            <p>For simplicity, let’s try the second form and see how it converges.</p>
            <ol>
              <li>Choose an Initial Guess**: Let <InlineMath math=" x_0 = 1 "/>.</li>

              <li>Iterate:</li>
              <ul>
                <li><InlineMath math=" x_1 = g(x_0) = \frac{1^2 + 4}{2} = \frac{5}{2} = 2.5 "/></li>
                <li><InlineMath math=" x_2 = g(x_1) = \frac{(2.5)^2 + 4}{2} = \frac{6.25 + 4}{2} = 5.125 "/></li>
              </ul>
              <p>Continuing with this iteration would show whether it converges toward a root. For some functions or
                formulations of <InlineMath math=" g(x) "/>, the method may not converge, which is a limitation of
                fixed-point iteration.</p>

              <li>Check for Convergence:</li>
              <ul>
                <li>For each iteration, check if <InlineMath math=" |x_{n + 1} - x_n| "/> is small enough to meet the
                  tolerance. If so, stop and take
                  <InlineMath math=" x_n "/> as the approximate root.
                </li>
              </ul>
            </ol>
            <h3>Convergence Conditions</h3>

            <p>Fixed-point iteration only converges if the chosen <InlineMath math=" g(x) "/> satisfies certain
              conditions, such as having a derivative with absolute value less than 1 near the fixed point. This is why
              choosing a proper form for <InlineMath math=" g(x) "/> is crucial.</p>

            <h3>Summary</h3>

            <p>The fixed-point iteration method is simple and can be effective if the function <InlineMath
              math=" g(x) "/> is chosen well. However, it is not always reliable, as it depends heavily on the
              convergence properties of <InlineMath math=" g(x) "/> near the fixed point. If <InlineMath
                math=" g(x) "/> does not cause the iterates to converge, other root-finding methods (like Newton’s
              method or bisection) may be preferred.</p>
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

export default FixedPoint