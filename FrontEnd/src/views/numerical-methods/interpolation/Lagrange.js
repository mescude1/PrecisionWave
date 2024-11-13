import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const Lagrange = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Lagrange</h2>
            <p>The **Lagrange Interpolation** method is one of the most widely used polynomial interpolation techniques.
              It provides a way to find the polynomial that passes through a given set of points, and it is particularly
              useful because it does not require solving a system of equations. The resulting polynomial is expressed as
              a **weighted sum** of basis polynomials, each of which is associated with a particular data point.</p>

            <h3> Lagrange Interpolation: Overview</h3>

            <p>Given a set of <InlineMath math=" n "/> data points <InlineMath
              math=" (x_1, y_1), (x_2, y_2), \dots, (x_n, y_n) "/>, the goal of Lagrange interpolation is to find a
              polynomial <InlineMath math=" P(x) "/> of degree at most <InlineMath math=" n-1 "/> that passes through
              all these points. The polynomial is expressed as a **linear combination** of Lagrange basis polynomials.
            </p>

            <p>The general form of the **Lagrange Interpolating Polynomial** is:</p>

            <BlockMath math="
P(x) = \sum_{i=1}^{n} y_i \ell_i(x)
"/>

            <p>Where <InlineMath math=" y_i "/> are the known function values at the data points, and <InlineMath
              math=" \ell_i(x) "/> are the Lagrange basis polynomials defined as:</p>

            <BlockMath math="
\ell_i(x) = \prod_{\substack{1 \leq j \leq n \\ j \neq i}} \frac{x - x_j}{x_i - x_j}
"/>

            <p>Each <InlineMath math=" \ell_i(x) "/> is a polynomial of degree <InlineMath math=" n-1 "/>, and it is
              constructed such that <InlineMath math=" \ell_i(x_j) = 1 "/> when <InlineMath math=" x_j = x_i "/>,
              and <InlineMath math=" \ell_i(x_j) = 0 "/> for all <InlineMath math=" j \neq i "/>. This ensures that
              each <InlineMath math=" \ell_i(x) "/> contributes only at its corresponding point <InlineMath
                math=" x_i "/>.</p>

            <h3> Key Properties of Lagrange Interpolation</h3>
            <ol>
              <li>Unique Polynomial**: The Lagrange polynomial is the unique polynomial of degree at most <InlineMath
                math=" n-1 "/> that passes through all <InlineMath math=" n "/> given points.
              </li>
              <li>No Solving Required**: Unlike methods like **Newton's method**, Lagrange interpolation does not
                require solving any system of equations. The coefficients of the polynomial are directly computed from
                the data points.
              </li>
              <li>Basis Polynomials: The <InlineMath math=" \ell_i(x) "/>'s are the **Lagrange basis polynomials** and
                are constructed to satisfy certain conditions (i.e., they are 1 at their corresponding data point and 0
                at all others).
              </li>
            </ol>
            <h3> Steps to Calculate the Lagrange Polynomial</h3>
            <ol>
              <li>
                Compute the Lagrange Basis Polynomials**: For each data point <InlineMath math=" (x_i, y_i) "/>,
                calculate the corresponding Lagrange basis polynomial <InlineMath math=" \ell_i(x) "/>:
                <BlockMath math="
   \ell_i(x) = \prod_{\substack{1 \leq j \leq n \\ j \neq i}} \frac{x - x_j}{x_i - x_j}
   "/>
                These polynomials will be used to weight the function values at each data point.
              </li>
              <li>
                Construct the Polynomial: The Lagrange interpolation polynomial is the sum of the weighted basis
                polynomials:
                <BlockMath math="
   P(x) = \sum_{i=1}^{n} y_i \ell_i(x)
   "/>
                This polynomial will pass through all the given points <InlineMath
                math=" (x_1, y_1), (x_2, y_2), \dots, (x_n, y_n) "/>.
              </li>
            </ol>
            <h3> Example of Lagrange Interpolation</h3>

            <p>Let's say we are given the following data points:</p>

            <BlockMath math="
(x_1, y_1) = (1, 2), \quad (x_2, y_2) = (2, 3), \quad (x_3, y_3) = (3, 5)
"/>

            <p>We want to find the Lagrange interpolation polynomial.</p>
            <ol>
              1. **Step 1: Compute the Basis Polynomials**:

              For <InlineMath math=" x_1 = 1 "/>:
              <BlockMath math="
   \ell_1(x) = \frac{(x - 2)(x - 3)}{(1 - 2)(1 - 3)} = \frac{(x - 2)(x - 3)}{2}
   "/>

              For <InlineMath math=" x_2 = 2 "/>:
              <BlockMath math="
   \ell_2(x) = \frac{(x - 1)(x - 3)}{(2 - 1)(2 - 3)} = -(x - 1)(x - 3)
   "/>

              For <InlineMath math=" x_3 = 3 "/>:
              <BlockMath math="
   \ell_3(x) = \frac{(x - 1)(x - 2)}{(3 - 1)(3 - 2)} = \frac{(x - 1)(x - 2)}{2}
   "/>

              2. **Step 2: Construct the Interpolation Polynomial**:

              Now, we can construct the Lagrange polynomial:
              <BlockMath math="
   P(x) = 2 \cdot \ell_1(x) + 3 \cdot \ell_2(x) + 5 \cdot \ell_3(x)
   "/>
              Substituting the values of the basis polynomials:
              <BlockMath math="
   P(x) = 2 \cdot \frac{(x - 2)(x - 3)}{2} + 3 \cdot (-(x - 1)(x - 3)) + 5 \cdot \frac{(x - 1)(x - 2)}{2}
   "/>
              Simplifying the expression:
              <BlockMath math="
   P(x) = (x - 2)(x - 3) - 3(x - 1)(x - 3) + \frac{5}{2}(x - 1)(x - 2)
   "/>

              This is the Lagrange polynomial that passes through the points <InlineMath
              math=" (1, 2), (2, 3), (3, 5) "/>.
            </ol>
            <h3> Advantages of Lagrange Interpolation</h3>
            <ol>
              1. **No Need for a System of Equations**: Unlike methods such as Newton's or Gaussian elimination,
              Lagrange interpolation does not require solving a system of equations, making it simpler to implement.
              2. **Straightforward Polynomial Construction**: The polynomial is directly constructed from the data
              points using a formula, which is often computationally easier than other methods.
              3. **Ease of Implementation**: Since no matrix inversion or complex operations are needed, the Lagrange
              method is relatively easy to program, especially for small datasets.
            </ol>
            <h3> Disadvantages of Lagrange Interpolation</h3>
            <ol>
              1. **Computational Cost for Large Data Sets**: Although easy to implement, Lagrange interpolation can
              become computationally expensive for large sets of data points due to the need to calculate the Lagrange
              basis polynomials for each data point.
              2. **Numerical Instability**: For large <InlineMath math=" n "/>, the Lagrange interpolation polynomial
              can become numerically unstable due to the increasing degree of the polynomial. This can lead to **Runge's
              phenomenon**, where the polynomial exhibits large oscillations between the points, especially at the
              edges.
              3. **High Degree Polynomials**: The polynomial degree increases with the number of data points. For large
              datasets, this may result in a high-degree polynomial that overfits the data, leading to poor
              generalization.
            </ol>
            <h3> Summary</h3>

            <p>**Lagrange Interpolation** provides a simple, elegant way to find the polynomial that passes through a
              set of points. It does not require solving any system of equations, and the resulting polynomial is easy
              to compute and understand. However, it can become inefficient for large datasets, and the resulting
              polynomial may suffer from numerical instability or oscillations if the number of points is large. Despite
              these limitations, Lagrange interpolation remains a useful method, especially when the number of data
              points is relatively small or when an explicit formula for the interpolating polynomial is required.</p>
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

export default Lagrange