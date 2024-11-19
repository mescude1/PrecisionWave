import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';


const CholeskyTheory = () => {
  return (<>
    <p><strong>Cholesky decomposition</strong> is a specialized matrix factorization method that applies
      specifically to <strong>symmetric, positive-definite matrices</strong>. It decomposes a matrix <InlineMath
        math=" A "/> into the product of a <strong>lower triangular matrix</strong> <InlineMath math=" L "/> and
      its <strong>transpose</strong> <InlineMath math=" L^T "/>, such that:</p>
    <BlockMath math="
A = LL^T
"/>
    <p>where:</p>
    <ul>
      <li><InlineMath math=" L "/> is a lower triangular matrix with positive entries on the diagonal.</li>
      <li><InlineMath math=" L^T "/> is the transpose of <InlineMath math=" L "/>, an upper triangular matrix.
      </li>
    </ul>
    <p>Cholesky decomposition is more efficient than LU factorization because it requires fewer computations,
      and it’s especially useful in numerical analysis, linear systems, and optimization problems.</p>

    <h3> Requirements for Cholesky Decomposition</h3>
    <ol>
      <li>Symmetry: The matrix <InlineMath math=" A "/> must be symmetric, meaning <InlineMath
        math=" A = A^T "/>.
      </li>
      <li>Positive-Definiteness: All eigenvalues of <InlineMath math=" A "/> must be positive, which implies
        that for any non-zero vector <InlineMath math=" x "/>, <InlineMath math=" x^T A x > 0 "/>.
      </li>
    </ol>
    <p>If these conditions are met, Cholesky decomposition is possible and guarantees that the resulting
      matrix <InlineMath math=" L "/> has real, positive entries on the diagonal.</p>

    <h3> Steps for Cholesky Decomposition</h3>

    <p>For an <InlineMath math=" n \times n "/> symmetric positive-definite matrix <InlineMath math=" A "/>:</p>
    <ol>
      <li>Initialize:
        <ul>
          <li>Set up an <InlineMath math=" n \times n "/> matrix <InlineMath math=" L "/> with all entries
            initially set to zero.
          </li>
        </ul></li>

      <li>Compute Elements of <InlineMath math=" L "/>:
        <ul>
          <li>- For each diagonal element <InlineMath math=" i "/>:
            <ul>
              <li>Compute <InlineMath math=" L_{ii} "/> using:</li>
              <BlockMath math="
       L_{ii} = \sqrt{a_{ii} - \sum_{k=1}^{i-1} L_{ik}^2}
       "/>
              <li>This formula uses the square root of the current diagonal element minus the sum of squares of
                all previously computed values in that row.
              </li>
            </ul>
          </li>
          <li>For each off-diagonal element <InlineMath math=" j > i "/>:
            <li>Compute <InlineMath math=" L_{ji} "/> using:</li>
            <BlockMath math="
       L_{ji} = \frac{a_{ji} - \sum_{k=1}^{i-1} L_{jk} L_{ik}}{L_{ii}}
       "/>
          </li>
          <li>Set all elements in <InlineMath math=" L "/> above the diagonal to zero, as <InlineMath
            math=" L "/> is a lower triangular matrix.
          </li>
        </ul>
      </li>
      <li>Result:
        <ul>
          <li>
            After iterating over all rows and columns, <InlineMath math=" L "/> will be a lower triangular
            matrix, and <InlineMath math=" A = LL^T "/>.
          </li>
        </ul></li>
    </ol>
    <h3> Example of Cholesky Decomposition</h3>

    <p>Consider the symmetric, positive-definite matrix:</p>
    <BlockMath math="
A = \begin{bmatrix} 4 & 12 & -16 \\ 12 & 37 & -43 \\ -16 & -43 & 98 \end{bmatrix}
"/>
    <p>We want to decompose <InlineMath math=" A "/> into <InlineMath math=" LL^T "/>.</p>
    <ol>
      <li>Compute <InlineMath math=" L_{11} "/>:
        <ul>
          <li><InlineMath math=" L_{11} = \sqrt{4} = 2 "/></li>
        </ul></li>

      <li>Compute <InlineMath math=" L_{21} "/> and <InlineMath math=" L_{31} "/>:
        <ul>
          <li><InlineMath math=" L_{21} = \frac{12}{L_{11}} = \frac{12}{2} = 6 "/></li>
          <li><InlineMath math=" L_{31} = \frac{-16}{L_{11}} = \frac{-16}{2} = -8 "/></li>
        </ul>
      </li>
      <li>Compute <InlineMath math=" L_{22} "/>:
        <ul>
          <li><InlineMath math=" L_{22} = \sqrt{37 - 6^2} = \sqrt{37 - 36} = 1 "/></li>
        </ul>
      </li>
      <li>Compute <InlineMath math=" L_{32} "/>:
        <ul>
          <li><InlineMath math=" L_{32} = \frac{-43 - (-8)(6)}{L_{22}} = \frac{-43 + 48}{1} = 5 "/></li>
        </ul>
      </li>
      <li>Compute <InlineMath math=" L_{33} "/>:
        <ul>
          <li><InlineMath math=" L_{33} = \sqrt{98 - (-8)^2 - 5^2} = \sqrt{98 - 64 - 25} = \sqrt{9} = 3 "/></li>
        </ul>
      </li>
      <li>Result:
        <ul>
          <li>The resulting matrix <InlineMath math=" L "/> is:
            <BlockMath math="
     L = \begin{bmatrix} 2 & 0 & 0 \\ 6 & 1 & 0 \\ -8 & 5 & 3 \end{bmatrix}
     "/></li>
          <li> Therefore, <InlineMath math=" A = LL^T "/>.</li>
        </ul>
      </li>
    </ol>
    <h3> Summary and Key Points</h3>
    <ul>
      <li><strong>Cholesky decomposition</strong> is highly efficient for symmetric positive-definite matrices,
        halving the number of calculations compared to LU decomposition since it factors <InlineMath
          math=" A "/> into <InlineMath math=" LL^T "/>.
      </li>
      <li><strong>Efficiency</strong>: Since Cholesky uses fewer computations, it is ideal for solving large
        linear systems and optimization problems.
      </li>
      <li><strong>Unique Structure</strong>: The resulting matrix <InlineMath math=" L "/> is uniquely defined
        if <InlineMath math=" A "/> is positive definite and provides a more stable solution when <InlineMath
          math=" A "/> meets the necessary conditions.
      </li>
    </ul>
    <p>Cholesky decomposition is widely used in numerical solutions for linear systems, statistical analysis,
      and simulations that involve covariance matrices, which are typically symmetric and positive-definite.</p>
  </>)
}

export default CholeskyTheory