import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'

const Cholesky = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            **Cholesky decomposition** is a specialized matrix factorization method that applies specifically to **symmetric, positive-definite matrices**. It decomposes a matrix \( A \) into the product of a **lower triangular matrix** \( L \) and its **transpose** \( L^T \), such that:
\[
A = LL^T
\]
where:
- \( L \) is a lower triangular matrix with positive entries on the diagonal.
- \( L^T \) is the transpose of \( L \), an upper triangular matrix.

Cholesky decomposition is more efficient than LU factorization because it requires fewer computations, and it’s especially useful in numerical analysis, linear systems, and optimization problems.

### Requirements for Cholesky Decomposition

1. **Symmetry**: The matrix \( A \) must be symmetric, meaning \( A = A^T \).
2. **Positive-Definiteness**: All eigenvalues of \( A \) must be positive, which implies that for any non-zero vector \( x \), \( x^T A x > 0 \).

If these conditions are met, Cholesky decomposition is possible and guarantees that the resulting matrix \( L \) has real, positive entries on the diagonal.

### Steps for Cholesky Decomposition

For an \( n \times n \) symmetric positive-definite matrix \( A \):

1. **Initialize**:
   - Set up an \( n \times n \) matrix \( L \) with all entries initially set to zero.

2. **Compute Elements of \( L \)**:
   - For each diagonal element \( i \):
     - Compute \( L_{ii} \) using:
       \[
       L_{ii} = \sqrt{a_{ii} - \sum_{k=1}^{i-1} L_{ik}^2}
       \]
     - This formula uses the square root of the current diagonal element minus the sum of squares of all previously computed values in that row.
   - For each off-diagonal element \( j > i \):
     - Compute \( L_{ji} \) using:
       \[
       L_{ji} = \frac{a_{ji} - \sum_{k=1}^{i-1} L_{jk} L_{ik}}{L_{ii}}
       \]
   - Set all elements in \( L \) above the diagonal to zero, as \( L \) is a lower triangular matrix.

3. **Result**:
   - After iterating over all rows and columns, \( L \) will be a lower triangular matrix, and \( A = LL^T \).

### Example of Cholesky Decomposition

Consider the symmetric, positive-definite matrix:
\[
A = \begin{bmatrix} 4 & 12 & -16 \\ 12 & 37 & -43 \\ -16 & -43 & 98 \end{bmatrix}
\]
We want to decompose \( A \) into \( LL^T \).

1. **Compute \( L_{11} \)**:
   - \( L_{11} = \sqrt{4} = 2 \)

2. **Compute \( L_{21} \) and \( L_{31} \)**:
   - \( L_{21} = \frac{12}{L_{11}} = \frac{12}{2} = 6 \)
   - \( L_{31} = \frac{-16}{L_{11}} = \frac{-16}{2} = -8 \)

3. **Compute \( L_{22} \)**:
   - \( L_{22} = \sqrt{37 - 6^2} = \sqrt{37 - 36} = 1 \)

4. **Compute \( L_{32} \)**:
   - \( L_{32} = \frac{-43 - (-8)(6)}{L_{22}} = \frac{-43 + 48}{1} = 5 \)

5. **Compute \( L_{33} \)**:
   - \( L_{33} = \sqrt{98 - (-8)^2 - 5^2} = \sqrt{98 - 64 - 25} = \sqrt{9} = 3 \)

6. **Result**:
   - The resulting matrix \( L \) is:
     \[
     L = \begin{bmatrix} 2 & 0 & 0 \\ 6 & 1 & 0 \\ -8 & 5 & 3 \end{bmatrix}
     \]
   - Therefore, \( A = LL^T \).

### Summary and Key Points

- **Cholesky decomposition** is highly efficient for symmetric positive-definite matrices, halving the number of calculations compared to LU decomposition since it factors \( A \) into \( LL^T \).
- **Efficiency**: Since Cholesky uses fewer computations, it is ideal for solving large linear systems and optimization problems.
- **Unique Structure**: The resulting matrix \( L \) is uniquely defined if \( A \) is positive definite and provides a more stable solution when \( A \) meets the necessary conditions.

Cholesky decomposition is widely used in numerical solutions for linear systems, statistical analysis, and simulations that involve covariance matrices, which are typically symmetric and positive-definite.
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

export default Cholesky