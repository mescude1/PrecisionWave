import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const GaussSeidel = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>

            <h2>Gauss-Seidel</h2>
            <p>The <strong>Gauss-Seidel method</strong> is an iterative technique for solving systems of linear
              equations, like the <strong>Jacobi method</strong>. It is often more efficient and converges faster than
              Jacobi, especially when the matrix is diagonally dominant or symmetric positive definite. The key
              difference between Gauss-Seidel and Jacobi is how the solution vector is updated in each iteration.</p>

            <p>In the <strong>Gauss-Seidel method</strong>, the new values of the solution vector are updated
              immediately and used in subsequent calculations within the same iteration. This makes the method more
              efficient than Jacobi, where all the values are updated simultaneously after each iteration.</p>

            <h3> How the Gauss-Seidel Method Works</h3>

            <p>For a system of linear equations <InlineMath math=" A \mathbf{x} = \mathbf{b} "/>, where <InlineMath
              math=" A "/> is an <InlineMath math=" n \times n "/> matrix, and <InlineMath
              math=" \mathbf{x} "/> and <InlineMath math=" \mathbf{b} "/> are vectors, the method works as follows:</p>
            <ol>
              <li>Decompose the Matrix:</li>
              <p>The matrix <InlineMath math=" A "/> can be decomposed into a <strong>diagonal matrix</strong>
                <InlineMath math=" D "/>, a <strong>lower triangular matrix</strong> <InlineMath math=" L "/>, and
                an <strong>upper triangular matrix</strong> <InlineMath math=" U "/> such that:</p>
              <BlockMath math="A = L + D + U"/>
              <p>where:</p>
              <ul>
                <li><InlineMath math=" L "/> contains all the elements below the diagonal of <InlineMath math=" A "/>,
                </li>
                <li><InlineMath math=" D "/> contains only the diagonal elements of <InlineMath math=" A "/>,</li>
                <li><InlineMath math=" U "/> contains all the elements above the diagonal of <InlineMath math=" A "/>.
                </li>
              </ul>
              <li>Iterative Formula:</li>
              <p>For each equation in the system, the Gauss-Seidel method updates each variable in the solution vector
                as follows:</p>
              <BlockMath
                math="x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1}^{i-1} a_{ij} x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij} x_j^{(k)} \right)"/>
              <p>where:</p>
              <ul>
                <li><InlineMath math=" x_i^{(k+1)} "/> is the updated value of the <InlineMath math=" i "/>-th variable
                  at the <InlineMath math=" (k+1) "/>-th iteration.
                </li>
                <li> The terms <InlineMath math=" x_j^{(k+1)} "/> are the newly updated values of the variables, and the
                  terms <InlineMath math=" x_j^{(k)} "/> are the old values from the previous iteration.
                </li>
              </ul>
              <p>This means that when calculating <InlineMath math=" x_i^{(k+1)} "/>, the method uses the updated
                values <InlineMath math=" x_1^{(k+1)}, x_2^{(k+1)}, \dots, x_{i-1}^{(k+1)} "/> from the same iteration,
                which is different from the Jacobi method, where only values from the previous iteration are used.</p>

              <li>Convergence Check:</li>
              <p>The method is repeated iteratively until the solution converges, usually when the difference between
                successive iterations becomes smaller than a given tolerance:</p>
              <BlockMath math="\| \mathbf{x}^{(k+1)} - \mathbf{x}^{(k)} \| < \epsilon"/>
              <p>where <InlineMath math=" \epsilon "/> is a small tolerance value.</p>

              <h3> Example of the Gauss-Seidel Method</h3>

              <p>Consider the system of linear equations:</p>
              <BlockMath math="3x + y - z = 1"/>
              <BlockMath math="x + 4y + z = 2"/>
              <BlockMath math="-x + y + 5z = 3"/>
              <p>This can be written as:</p>
              <BlockMath math="A \mathbf{x} = \mathbf{b}"/>
              <p>where:</p>
              <BlockMath
                math="A = \begin{bmatrix} 3 & 1 & -1 \\ 1 & 4 & 1 \\ -1 & 1 & 5 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}"/>

              <p>The iterative formula for the Gauss-Seidel method for this system would be:</p>
              <ul>

                <li>For <InlineMath math=" x "/>:</li>
                <BlockMath math="x^{(k+1)} = \frac{1}{3} \left( 1 - y^{(k)} + z^{(k)} \right)"/>
                <li>For <InlineMath math=" y "/>:</li>
                <BlockMath math="y^{(k+1)} = \frac{1}{4} \left( 2 - x^{(k+1)} - z^{(k)} \right)"/>
                <li>For <InlineMath math=" z "/>:</li>
                <BlockMath math="z^{(k+1)} = \frac{1}{5} \left( 3 + x^{(k+1)} - y^{(k+1)} \right)"/>
              </ul>
            </ol>
            <h3> Step-by-Step Calculation</h3>
            <ol>
              <li>Start with an Initial Guess:</li>
              <p>Assume <InlineMath math=" \mathbf{x}^{(0)} = [0, 0, 0]^T "/> as the initial guess.</p>
              <li>First Iteration:</li>
              <ul>
                <li>- For <InlineMath math=" x^{(1)} "/>:</li>
                <BlockMath math="x^{(1)} = \frac{1}{3} \left( 1 - 0 + 0 \right) = \frac{1}{3} \approx 0.333"/>
                <li> For <InlineMath math=" y^{(1)} "/>:</li>
                <BlockMath
                  math="y^{(1)} = \frac{1}{4} \left( 2 - 0.333 - 0 \right) = \frac{1}{4} \times 1.667 = 0.417"/>
                <li> For <InlineMath math=" z^{(1)} "/>:</li>
                <BlockMath
                  math="z^{(1)} = \frac{1}{5} \left( 3 + 0.333 - 0.417 \right) = \frac{1}{5} \times 2.916 = 0.583"/>
              </ul>
              <li>Second Iteration:</li>
              <p>Now use the updated values <InlineMath math=" x^{(1)}, y^{(1)}, z^{(1)} "/> to calculate the new values
                for <InlineMath math=" x^{(2)}, y^{(2)}, z^{(2)} "/>, and so on, until the solution converges.</p>

              <li>Convergence:</li>
              <p>Continue iterating until the difference between successive iterations is smaller than the chosen
                tolerance.</p>
            </ol>

            <h3> Convergence Conditions</h3>

            <p>The Gauss-Seidel method converges if:</p>
            <ol>
              <li>Diagonally Dominant Matrix: The matrix <InlineMath math=" A "/> is diagonally dominant, meaning for
                each row <InlineMath math=" i "/>, the absolute value of the diagonal element <InlineMath
                  math=" |a_{ii}| "/> is greater than the sum of the absolute values of all the other (non-diagonal)
                elements in that row:
              </li>
              <BlockMath math="|a_{ii}| > \sum_{j \neq i} |a_{ij}|"/>
              <li>Symmetric Positive Definite Matrix: Gauss-Seidel also converges for symmetric positive-definite
                matrices, which are a subset of diagonally dominant matrices.
              </li>
            </ol>
            <h3> Advantages and Disadvantages of Gauss-Seidel</h3>
            <ul>
              <li><strong>Advantages</strong>:</li>
              <ul>
                <li><strong>Faster Convergence</strong>: Generally converges faster than the Jacobi method due to the
                  use of the latest values within the same iteration.
                </li>
                <li><strong>Simplicity</strong>: The method is easy to implement and only requires simple arithmetic
                  operations.
                </li>
              </ul>
              <li><strong>Disadvantages</strong>:</li>
              <ul>
                <li><strong>Non-Convergence for Some Systems</strong>: It may not converge for systems that are not
                  diagonally dominant or not symmetric positive definite.
                </li>
                <li><strong>Sequential Updates</strong>: The method cannot be easily parallelized because each new
                  solution value depends on the updated values from the same iteration.
                </li>
              </ul>
            </ul>
            <h3> Summary</h3>

            <p>The <strong>Gauss-Seidel method</strong> is an iterative technique for solving linear systems, using the
              most recent solution values within the same iteration. It is faster than Jacobi and is more suitable for
              diagonally dominant or symmetric positive-definite matrices. It is widely used in applications that
              require iterative methods for solving large systems, especially when matrix properties guarantee
              convergence.</p>

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

export default GaussSeidel