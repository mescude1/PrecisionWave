import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';


const DoolittleTheory = () => {
  return (<>
<p><strong>Doolittle's method</strong> is another approach to LU factorization that decomposes a square
              matrix <InlineMath math=" A "/> into a product of a <strong>lower triangular matrix</strong> <InlineMath
                math=" L "/> and an <strong>upper triangular matrix</strong> <InlineMath math=" U "/>. In Doolittle's
              method, the matrix <InlineMath math=" L "/> has ones on the diagonal (unlike Crout's method,
              where <InlineMath math=" U "/> has ones on the diagonal).</p>

            <p>In other words, Doolittle's method finds matrices <InlineMath math=" L "/> and <InlineMath
              math=" U "/> such that:</p>
            <BlockMath math="A = LU"/>
            <p>where:</p>
            <ul>
              <li><InlineMath math=" L "/> is a lower triangular matrix with ones on its diagonal.</li>
              <li><InlineMath math=" U "/> is an upper triangular matrix with non-zero elements on and above its
                diagonal.
              </li>
            </ul>
            <h3> Steps of Doolittle's Method</h3>
            <ol>
              <li>Initialize Matrices <InlineMath math=" L "/> and <InlineMath math=" U "/>:</li>
              <ul>
                <li>Start with <InlineMath math=" L "/> as an identity matrix (ones on the diagonal and zeros
                  elsewhere).
                </li>
                <li>Set <InlineMath math=" U "/> initially as a zero matrix.</li>
              </ul>
              <li>Decomposition Process:</li>
              <ul>
                <li>For each column <InlineMath math=" i "/> (from 1 to <InlineMath math=" n "/>), compute the elements of <InlineMath math=" U "/> and <InlineMath math=" L "/> as follows:</li>
                <ul>
                  <li><strong>Compute elements in <InlineMath math=" U "/></strong> (upper triangular matrix):</li>
                  <ul>
                    <li>For each row <InlineMath math=" j \leq i "/>, calculate <InlineMath math=" u_{ij} "/> using:</li>
                    <BlockMath math="u_{ij} = a_{ij} - \sum_{k=1}^{i-1} l_{ik} u_{kj}"/>
                  </ul>
                  <li><strong>Compute elements in <InlineMath math=" L "/></strong> (lower triangular matrix):</li>
                  <ul>
                    <li>For each row <InlineMath math=" j > i "/>, calculate <InlineMath math=" l_{ji} "/> using:</li>
                    <BlockMath math="l_{ji} = \frac{a_{ji} - \sum_{k=1}^{i-1} l_{jk} u_{ki}}{u_{ii}}"/>
                  </ul>
                  <li>This process fills in the values in <InlineMath math=" U "/> (on and above the diagonal) and <InlineMath math=" L "/> (below the diagonal with ones on the diagonal).</li>
                </ul>
              </ul>
              <li>Result:</li>
              <p>After these calculations, <InlineMath math=" L "/> and <InlineMath math=" U "/> matrices will represent the LU decomposition of <InlineMath math=" A "/> using Doolittle's method.</p>
            </ol>
            <h3> Example of Doolittle's Method</h3>

            <p>Consider the matrix:</p>
            <BlockMath math="A = \begin{bmatrix} 2 & 3 & 1 \\ 4 & 7 & 2 \\ 6 & 18 & 5 \end{bmatrix}"/>
            <p>We want to decompose <InlineMath math=" A "/> into <InlineMath math=" LU "/> where <InlineMath
              math=" L "/> has ones on the diagonal and <InlineMath math=" U "/> is upper triangular.</p>
            <ol>
              <li>Initialize <InlineMath math=" L "/> and <InlineMath math=" U "/>:</li>
              <ul>
                <li><InlineMath math=" L = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} "/></li>
                <li><InlineMath math=" U = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} "/></li>
              </ul>
              <li>Compute <InlineMath math=" U "/> and <InlineMath math=" L "/> elements:</li>
              <ul>
                <li><strong>For <InlineMath math=" i = 1 "/></strong>:</li>
                <ul>
                  <li>Compute <InlineMath math=" u_{11} = a_{11} = 2 "/></li>
                  <li>Compute <InlineMath math=" u_{12} = a_{12} = 3 "/></li>
                  <li>Compute <InlineMath math=" u_{13} = a_{13} = 1 "/></li>
                  <li>Compute <InlineMath math=" l_{21} = \frac{a_{21}}{u_{11}} = \frac{4}{2} = 2 "/></li>
                  <li>Compute <InlineMath math=" l_{31} = \frac{a_{31}}{u_{11}} = \frac{6}{2} = 3 "/></li>
                </ul>
                <li><strong>For <InlineMath math=" i = 2 "/></strong>:</li>
                <ul>
                  <li>Compute <InlineMath math=" u_{22} = a_{22} - l_{21} u_{12} = 7 - (2 \cdot 3) = 1 "/></li>
                  <li>Compute <InlineMath math=" u_{23} = a_{23} - l_{21} u_{13} = 2 - (2 \cdot 1) = 0 "/></li>
                  <li>Compute <InlineMath
                    math=" l_{32} = \frac{a_{32} - l_{31} u_{12}}{u_{22}} = \frac{18 - (3 \cdot 3)}{1} = 9 "/></li>
                </ul>
                <li><strong>For <InlineMath math=" i = 3 "/></strong>:</li>
                <ul>
                  <li>Compute <InlineMath
                    math=" u_{33} = a_{33} - l_{31} u_{13} - l_{32} u_{23} = 5 - (3 \cdot 1) - (9 \cdot 0) = 2 "/></li>
                </ul>
              </ul>
              <li>Result:</li>
              <ul>
                <li>After performing these calculations, we get:</li>
                <BlockMath math="
   L = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 3 & 9 & 1 \end{bmatrix}, \quad U = \begin{bmatrix} 2 & 3 & 1 \\ 0 & 1 & 0 \\ 0 & 0 & 2 \end{bmatrix}
   "/>
                <li>Therefore, <InlineMath math=" A = LU "/>.</li>
              </ul>
            </ol>
            <h3> Summary of Key Points</h3>
            <ul>
              <li><strong>Doolittle's method</strong> produces a lower triangular matrix <InlineMath math=" L "/> with
                ones on the diagonal and an upper triangular matrix <InlineMath math=" U "/> with the original matrix's
                values adjusted to maintain the structure.
              </li>
              <li><strong>Numerical Stability</strong>: Like other LU methods, Doolittle's method can be made more
                stable by adding partial pivoting if necessary.
              </li>
              <li><strong>Efficiency</strong>: Doolittle's method is computationally efficient and commonly used for LU
                factorization because of its straightforward structure for <InlineMath math=" L "/> and <InlineMath
                  math=" U "/>, especially in cases where pivoting is not necessary
              </li>
            </ul>
            <p>Doolittle’s method is useful in applications that require repeated solutions of linear systems, matrix
              inversion, and determinant calculation.</p>

 </>)
}

export default DoolittleTheory