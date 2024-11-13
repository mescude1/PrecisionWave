import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const Crout = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Crout</h2>
            <p><strong>Crout's method</strong> is a variant of LU factorization that decomposes a matrix <InlineMath
              math="A "/> into the product of a <strong>lower triangular matrix</strong> <InlineMath math="L "/> and
              an <strong>upper triangular matrix</strong> <InlineMath math="U "/> with a slightly different structure
              than traditional LU decomposition. Specifically, in Crout's method, <InlineMath math="L "/> has non-zero
              values below and on the diagonal, while <InlineMath math="U "/> has ones on the diagonal and potentially
              non-zero values above it.</p>

            <p>In Crout’s method, the decomposition results in:</p>

            <BlockMath math="A = LU"/>

            <p>where:</p>
            <ul>
              <li><InlineMath math="L "/> is a lower triangular matrix with non-zero elements on the diagonal and below.
              </li>
              <li><InlineMath math="U "/> is an upper triangular matrix with ones on the diagonal and non-zero elements
                above it.
              </li>
            </ul>

            <h3>Steps of Crout’s Method</h3>

            <ol>
              <li>Initialize Matrices <InlineMath math="L "/> and <InlineMath math="U "/>:</li>

              <ul>
                <li><InlineMath math="L "/> is initialized as an <InlineMath math="n \times n "/> matrix with all zeros.
                </li>
                <li><InlineMath math="U "/> is initialized as an identity matrix (with ones on the diagonal and zeros
                  elsewhere).
                </li>
              </ul>

              <li>Decomposition Process:</li>

              <ul>
                <li> For each column <InlineMath math="i "/> (from 1 to <InlineMath math="n "/>):</li>
                <ul>
                  <li><strong>Compute elements in <InlineMath math="L "/></strong>:</li>
                  <ul>
                    <li> For each row <InlineMath math="j \geq i "/>, calculate <InlineMath math="l_{ji} "/> as follows:
                    </li>
                  </ul>
                  <BlockMath math="l_{ji} = a_{ji} - \sum_{k = 1}^{i - 1} l_{jk} u_{ki}"/>
                  <li><strong>Compute elements in <InlineMath math="U "/></strong>:</li>
                  <ul>
                    <li> For each row <InlineMath math="j < i "/>, calculate <InlineMath math="u_{ij} "/> as follows:
                    </li>
                  </ul>
                </ul>
                <BlockMath math="u_{ij} = \frac{a_{ij} - \sum_{k=1}^{i-1} l_{ik} u_{kj}}{l_{ii}}"/>
              </ul>

              <li> Each element in <InlineMath math="L "/> is computed to fill the lower part of the matrix (including
                the diagonal), while elements in <InlineMath math="U "/> are computed to fill the upper part above the
                diagonal.
              </li>

              <li>Stop When Complete:</li>
              <ul>
                <li> Repeat these calculations until all elements in <InlineMath math="L "/> and <InlineMath
                  math="U "/> are computed. After the <InlineMath math="n "/>-th
                  iteration, you will have the complete <InlineMath math="L "/> and <InlineMath math="U "/> matrices.
                </li>
              </ul>
            </ol>
            <h3> Example of Crout's Method</h3>

            <p>Consider the matrix:</p>

            <BlockMath math="A = \begin{bmatrix} 4 & 2 & 3 \\ 3 & 1 & 2 \\ 2 & 1 & 3 \end{bmatrix}"/>

            <p>We want to decompose <InlineMath math="A "/> into <InlineMath math="LU "/> where <InlineMath
              math="L "/> and <InlineMath math="U "/> have the structure specified by Crout's method.</p>

            <ol>
              <li>Initialize <InlineMath math="L "/> and <InlineMath math="U "/>:</li>
              <BlockMath math="L = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} "/>
              <BlockMath math="U = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} "/>
              <li> Compute <InlineMath math="L "/> and <InlineMath math="U "/> elements:</li>
              <ul>
                <li><strong>For <InlineMath math="i = 1 "/></strong>:</li>
                <ul>
                  <li> Compute <InlineMath math="l_{11} = a_{11} = 4 "/></li>
                  <li> Compute <InlineMath math="l_{21} = a_{21} = 3 "/></li>
                  <li> Compute <InlineMath math="l_{31} = a_{31} = 2 "/></li>
                  <li> Compute <InlineMath
                    math="u_{12} = \frac{a_{12} - l_{11} \cdot u_{12}}{l_{11}} = \frac{2}{4} = 0.5 "/></li>
                  <li> Compute <InlineMath
                    math="u_{13} = \frac{a_{13} - l_{11} \cdot u_{13}}{l_{11}} = \frac{3}{4} = 0.75 "/></li>
                </ul>
                <li><strong>For <InlineMath math="i = 2 "/></strong>:</li>
                <ul>
                  <li> Compute <InlineMath math="l_{22} = a_{22} - l_{21} u_{12} = 1 - 3 \cdot 0.5 = -0.5 "/></li>
                  <li> Compute <InlineMath math="l_{32} = a_{32} - l_{31} u_{12} = 1 - 2 \cdot 0.5 = 0 "/></li>
                  <li> Compute <InlineMath
                    math="u_{23} = \frac{a_{23} - l_{22} u_{13}}{l_{22}} = \frac{2 - (-0.5 \cdot 0.75)}{-0.5} = -1.5 "/>
                  </li>
                </ul>
                <li><strong>For <InlineMath math="i = 3 "/></strong>:</li>
                <ul>
                  <li> Compute <InlineMath
                    math="l_{33} = a_{33} - l_{31} u_{13} - l_{32} u_{23} = 3 - (2 \cdot 0.75) = 1.5 "/></li>
                </ul>
              </ul>
              <li>Result:</li>
              <BlockMath math="
              L = \begin{bmatrix} 4 & 0 & 0 \\ 3 & -0.5 & 0 \\ 2 & 0 & 1.5 \end{bmatrix}, \quad U = \begin{bmatrix} 1 & 0.5
              &
              0.75 \\ 0 & 1 & -1.5 \\ 0 & 0 & 1 \end{bmatrix}
            "/>
            </ol>

            <h3> Summary and Key Points</h3>

            <ul>
              <li><strong>Crout's method</strong> produces a lower triangular <InlineMath math="L "/> matrix with values
                on and below the diagonal and an upper triangular <InlineMath math="U "/> matrix with ones on the
                diagonal
                and values above.
              </li>
              <li><strong>No Pivoting</strong>: Crout’s method assumes no pivoting; however, if numerical stability is a
                concern, it’s often combined with partial pivoting.
              </li>
              <li><strong>Efficiency</strong>: Crout’s method is efficient for decomposing a matrix, especially for
                large matrices, as it directly builds <InlineMath math="L "/> and <InlineMath math="U "/> with fewer
                operations.
              </li>
            </ul>
            <p>This method is particularly useful in solving systems of linear equations, inverting matrices, and other
              applications where repeated matrix solutions are needed.</p>
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

export default Crout