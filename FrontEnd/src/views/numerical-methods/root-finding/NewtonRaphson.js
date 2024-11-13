import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const NewtonRaphson = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Newton-Raphson</h2>
            <p>The **Newton-Raphson method** (or simply **Newton's method**) is a powerful root-finding algorithm that
              uses both the value and the derivative of a function to rapidly converge to a root. It’s known for its
              fast convergence rate, especially near the root, making it one of the most efficient root-finding methods
              when it converges. However, it requires that the derivative of the function be known and may fail if the
              initial guess is too far from the root.</p>

            <h3>Steps in the Newton-Raphson Method</h3>
            <ol>
              <li>Choose an Initial Guess:</li>
              <ul>
                <li>Start with an initial guess, <InlineMath math=" x_0 "/>, that is reasonably close to the root
                  of <InlineMath math=" f(x) = 0 "/>.
                </li>
              </ul>
              <li>Iterate Using Newton’s Formula:</li>
              <ul>
                <li> Use the iterative formula:</li>
              </ul>
              <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}"/>
              <ul>
                <li>This formula estimates the root by drawing a tangent line at the current point <InlineMath
                  math=" (x_n, f(x_n)) "/> and finding where this tangent line intersects the x-axis.
                </li>
              </ul>
              <li>Repeat Until Convergence:</li>
              <ul>
                <li> Continue calculating successive approximations <InlineMath
                  math=" x_{n+1}, x_{n+2}, \ldots "/> until the difference between successive values is sufficiently
                  small, i.e., <InlineMath math=" |x_{n+1} - x_n| "/> is less than a chosen tolerance level.
                </li>
              </ul>
              <li>Check for Convergence or Failure:</li>
              <ul>
                <li> If <InlineMath math=" f(x_n) "/> or <InlineMath math=" f'(x_n) "/> is very close to zero at any
                  step, the method might fail, as division by a
                  near-zero derivative could lead to large jumps or divergence.
                </li>
                <li> If convergence isn’t reached within a set number of iterations, the method is terminated.</li>
              </ul>
            </ol>
            <h3>Example of the Newton-Raphson Method</h3>

            <p>Suppose we want to find a root of the function <InlineMath math=" f(x) = x^2 - 4 "/>, which has roots
              at <InlineMath math=" x = 2 "/> and <InlineMath math=" x = -2 "/>. The derivative of <InlineMath
                math=" f(x) "/> is <InlineMath math=" f'(x) = 2x "/>.</p>
            <ol>
              <li>Choose an Initial Guess: Let’s start with <InlineMath math=" x_0 = 3 "/>.
              </li>

              <li>First Iteration:</li>
              <ul>
                <li> Calculate <InlineMath math=" f(x_0) = f(3) = 3^2 - 4 = 5 "/>.</li>
                <li> Calculate <InlineMath math=" f'(x_0) = f'(3) = 2 \cdot 3 = 6 "/>.</li>
                <li> Use Newton’s formula:</li>
                <BlockMath math="x_1 = x_0 - \frac{f(x_0)}{f'(x_0)} = 3 - \frac{5}{6} = 3 - 0.8333 = 2.1667"/>
              </ul>
              <li>Second Iteration:</li>
              <ul>
                <li> Calculate <InlineMath math=" f(x_1) = f(2.1667) = (2.1667)^2 - 4 \approx 0.6944 "/>.</li>
                <li> Calculate <InlineMath math=" f'(x_1) = f'(2.1667) = 2 \cdot 2.1667 = 4.3333 "/>.</li>
                <li> Update <InlineMath math=" x "/> using Newton’s formula:</li>
              </ul>
              <BlockMath math="x_2 = x_1 - \frac{f(x_1)}{f'(x_1)} = 2.1667 - \frac{0.6944}{4.3333} \approx 2.0064"/>

              <li>Third Iteration:</li>
              <ul>
                <li> Repeat the process until the difference between <InlineMath math=" x_n "/> and <InlineMath
                  math=" x_{n + 1} "/> is within a set
                  tolerance. In a few more steps, the method will converge very close to the root <InlineMath
                    math=" x = 2 "/>.
                </li>
              </ul>
            </ol>
            <h3>Summary</h3>

            <p>The Newton-Raphson method is highly efficient, typically converging quadratically (doubling the number of
              correct digits with each step) near the root. However, it has some limitations:</p>
            <ul>
              <li><strong>Requires Derivative</strong>: It needs the function’s derivative, which may not always be
                available or easy to compute.
              </li>
              <li><strong>Divergence</strong>: If the initial guess is too far from the root or if the function’s
                derivative is zero or close to zero at any point in the iteration, the method may diverge.
              </li>
              <li><strong>Sensitive to Initial Guess</strong>: The choice of the starting point <InlineMath
                math=" x_0 "/> significantly affects convergence.
              </li>
            </ul>
            <p>Despite these limitations, when applied to well-behaved functions and with a good initial guess, Newton's
              method is one of the fastest and most widely used root-finding methods.</p>
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

export default NewtonRaphson