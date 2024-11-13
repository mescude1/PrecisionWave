import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const LuFactorization = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>LU Factorization</h2>
            <p><strong>LU factorization</strong> (or <strong>LU decomposition</strong>) is a method for decomposing a
              square matrix <InlineMath math=" A "/> into the product of two matrices: a <strong>lower triangular
                matrix</strong> <InlineMath math=" L "/> and an <strong>upper triangular matrix</strong> <InlineMath
                math=" U "/>. This factorization is useful for efficiently solving linear systems, computing matrix
              inverses, and finding determinants.</p>

            <p>In this process:</p>
            <ol>
              <li><InlineMath math=" A = LU "/> where <InlineMath math=" L "/> is a lower triangular matrix with ones on
                the diagonal, and <InlineMath math=" U "/> is an upper triangular matrix.
              </li>
              <li>LU factorization is efficient because once <InlineMath math=" A "/> is decomposed into <InlineMath
                math=" L "/> and <InlineMath math=" U "/>, solving a linear system <InlineMath math=" Ax = b "/> is
                simplified into two triangular systems:
              </li>
            </ol>
            <p> First, solve <InlineMath math=" Ly = b "/> for <InlineMath math=" y "/> (forward substitution).</p>
            <p> Then, solve <InlineMath math=" Ux = y "/> for <InlineMath math=" x "/> (back substitution).</p>

            <h3> LU Factorization Without Pivoting</h3>

            <p>LU factorization without pivoting assumes that all leading principal minors of the matrix are non-zero.
              The process is straightforward:</p>
            <ol>
              <li>Initialize <InlineMath math=" L "/> and <InlineMath math=" U "/>:</li>
              <ul>
                <li> Set <InlineMath math=" U "/> initially to be a copy of <InlineMath math=" A "/>.</li>
                <li> Set <InlineMath math=" L "/> to be an identity matrix.</li>
              </ul>
              <li>Forward Elimination:</li>
              <ul>
                <li> For each column <InlineMath math=" i "/>, perform elimination to create zeros below the diagonal
                  in <InlineMath math=" U "/>.
                </li>
                <li> For each row <InlineMath math=" j > i "/>, calculate the multiplier <InlineMath
                  math=" m_{ji} = \frac{u_{ji}}{u_{ii}} "/>.
                </li>
                <li> Subtract <InlineMath math=" m_{ji} \times \text{Row } i "/> from Row <InlineMath math=" j "/> to
                  create a zero below <InlineMath math=" u_{ii} "/>.
                </li>
                <li> Store <InlineMath math=" m_{ji} "/> in <InlineMath math=" L "/> at position <InlineMath
                  math=" (j, i) "/> (as it represents the factor needed to make the elements below the pivot zero).
                </li>
              </ul>
              <li>Result:</li>
              <ul>
                <li> After forward elimination, <InlineMath math=" U "/> is an upper triangular matrix,
                  and <InlineMath
                    math=" L "/> contains the multipliers used in elimination.
                </li>
              </ul>
            </ol>
            <h4> Example</h4>

            <p>For a simple matrix <InlineMath math=" A "/>:</p>
            <BlockMath math="A = \begin{bmatrix} 2 & 3 \\ 4 & 7 \end{bmatrix}"/>
            <ol>
              <li>Begin with <InlineMath math=" L = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} "/> and <InlineMath
                math=" U = A "/>.
              </li>
              <li>Use Row 1 to eliminate <InlineMath math=" u_{21} "/> by calculating <InlineMath
                math=" m_{21} = \frac{4}{2} = 2 "/>.
              </li>
              <li>Update <InlineMath math=" L "/> with <InlineMath math=" m_{21} "/> and <InlineMath math=" U "/> to
                zero
                out below the pivot in Row 2.
              </li>
            </ol>
            <p>Result:</p>
            <BlockMath
              math="L = \begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix}, \quad U = \begin{bmatrix} 2 & 3 \\ 0 & 1 \end{bmatrix}"/>

            <p>This works fine for matrices that do not require row swapping for numerical stability.</p>

            <h3> LU Factorization with Partial Pivoting</h3>

            <p>When <strong>partial pivoting</strong> is included, row swaps are performed to ensure stability by
              selecting the largest available pivot element in each column. This is especially useful when the matrix
              contains small or zero elements on the diagonal, which could lead to numerical instability or division
              by zero.</p>
            <ol>
              <li>Introduce a Permutation Matrix <InlineMath math=" P "/>:</li>
              <ul>
                <li><InlineMath math=" A "/> is factorized as <InlineMath math=" PA = LU "/>, where <InlineMath
                  math=" P "/> is
                  a permutation matrix representing row swaps.
                </li>
                <li>Initially, <InlineMath math=" P "/> is an identity matrix, and it gets updated with each row swap.
                </li>
              </ul>
              <li>Forward Elimination with Pivoting:</li>
              <ul>
                <li> For each column <InlineMath math=" i "/>, find the row <InlineMath math=" r "/> where <InlineMath
                  math=" |a_{ri}| "/> is the largest among the entries below or at <InlineMath math=" i "/>.
                </li>
                <li> Swap rows <InlineMath math=" i "/> and <InlineMath math=" r "/> in <InlineMath math=" A "/>,
                  update <InlineMath math=" P "/> to reflect the row swap, and perform the same row swap
                  in <InlineMath
                    math=" L "/> (for elements in the current <InlineMath math=" L "/> submatrix only).
                </li>
                <li> Proceed with forward elimination as in the non-pivoting case, storing multipliers in <InlineMath
                  math=" L "/> and updating <InlineMath math=" U "/>.
                </li>
              </ul>
              <li>Result:</li>
              <ul>
                <li> After forward elimination, <InlineMath math=" U "/> is an upper triangular matrix, <InlineMath
                  math=" L "/> is a lower triangular matrix with unit diagonal, and <InlineMath math=" P "/> is a
                  permutation matrix that represents the row swaps made.
                </li>
              </ul>
            </ol>
            <h4> Example with Partial Pivoting</h4>

            <p>Consider a matrix with a small leading element:</p>
            <BlockMath math="A = \begin{bmatrix} 0.0001 & 1 \\ 1 & 1 \end{bmatrix}"/>

            <p>Since <InlineMath math=" |a_{21}| > |a_{11}| "/>, swap Rows 1 and 2 in <InlineMath math=" A "/> and
              also update <InlineMath math=" P "/>:</p>
            <BlockMath
              math="P = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \quad PA = \begin{bmatrix} 1 & 1 \\ 0.0001 & 1 \end{bmatrix}"/>
            <p>Proceed with forward elimination using the modified matrix <InlineMath math=" PA "/>, finding <InlineMath
              math=" L "/> and <InlineMath math=" U "/>.</p>

            <p>Result:</p>
            <BlockMath
              math="L = \begin{bmatrix} 1 & 0 \\ 0.0001 & 1 \end{bmatrix}, \quad U = \begin{bmatrix} 1 & 1 \\ 0 & 0.9999 \end{bmatrix}, \quad PA = LU"/>

            <h3> Summary of LU Factorization Types</h3>
            <ul>
              <li><strong>Without Pivoting</strong>: Works for matrices without zero or very small diagonal elements but
                can be unstable or fail otherwise.
              </li>
              <li><strong>With Partial Pivoting</strong>: More stable, used in most practical applications as it avoids
                numerical instability and division by zero.
              </li>
            </ul>
            <p>Using pivoting makes LU factorization robust and applicable to a wider range of matrices, preserving
              accuracy in numerical calculations.</p>
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

export default LuFactorization