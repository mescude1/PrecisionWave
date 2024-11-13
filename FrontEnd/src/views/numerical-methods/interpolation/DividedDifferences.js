import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const DividedDifferences = () => {
  return (
    <CRow>
      <CCol xs={9}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Divided Differences</h2>
            <p>Newton's Divided Differences is a method used for polynomial interpolation, particularly when
              constructing the Newton form of the interpolating polynomial. The method provides a way to calculate
              the coefficients of the polynomial that passes through a given set of data points, and is often preferred
              for its ease of updating the polynomial when new data points are added.</p>

            <h3> Newton's Divided Differences: Overview</h3>

            <p>Given a set of <InlineMath math=" n "/> data points <InlineMath
              math=" (x_1, y_1), (x_2, y_2), \dots, (x_n, y_n) "/>, the goal is to find a polynomial <InlineMath
              math=" P(x) "/> of degree at most <InlineMath math=" n-1 "/> that interpolates the data. The polynomial is
              typically expressed in Newton's form as:</p>

            <BlockMath math="
P(x) = a_0 + a_1(x - x_1) + a_2(x - x_1)(x - x_2) + \dots + a_{n-1}(x - x_1)(x - x_2) \dots (x - x_{n-1})
"/>

            <p>Where the coefficients <InlineMath math=" a_0, a_1, \dots, a_{n-1} "/> are calculated using divided
              differences.</p>

            <h3> Divided Differences</h3>

            <p>A divided difference is a recursive division of the difference between function values at two points by
              the difference between the two points themselves. This concept allows for the construction of the
              coefficients for the Newton form of the interpolating polynomial.</p>

            <p>The general formula for the divided difference is:</p>

            <BlockMath math="
[f(x_0, x_1)] = \frac{f(x_1) - f(x_0)}{x_1 - x_0}
"/>

            <p>This is the first-order divided difference, which is simply the slope of the line connecting two
              points.</p>

            <p>For higher-order divided differences, the formula is:</p>

            <BlockMath math="
[f(x_0, x_1, \dots, x_k)] = \frac{[f(x_1, \dots, x_k)] - [f(x_0, \dots, x_{k-1})]}{x_k - x_0}
"/>

            <p>Here, <InlineMath math=" [f(x_0, x_1, \dots, x_k)] "/> represents the <InlineMath math=" k "/>-th order
              divided difference, which is computed recursively using the previously calculated values.</p>

            <h3> Constructing the Newton Polynomial Using Divided Differences</h3>
            <ol>
              <li>Initial Step:
                <p>Start with the known data points <InlineMath math=" (x_1, y_1), (x_2, y_2), \dots, (x_n, y_n) "/>.
                  The first-order divided differences are computed as:</p>
                <BlockMath math="
   a_0 = f(x_1) = y_1
   "/>
                <BlockMath math="
   a_1 = [f(x_1, x_2)] = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
   "/>
                <BlockMath math="
   a_2 = [f(x_1, x_2, x_3)] = \frac{[f(x_2, x_3)] - [f(x_1, x_2)]}{x_3 - x_1}
   "/>
                <p>And so on, until <InlineMath math=" a_{n-1} "/>, which is the last divided difference.</p>
              </li>
              <li>Building the Polynomial:
                <p>Once all the coefficients <InlineMath math=" a_0, a_1, \dots, a_{n-1} "/> are computed, the Newton
                  polynomial is constructed as:</p>
                <BlockMath math="
   P(x) = a_0 + a_1(x - x_1) + a_2(x - x_1)(x - x_2) + \dots + a_{n-1}(x - x_1)(x - x_2) \dots (x - x_{n-1})
  "/></li>
            </ol>
            <h3> Example of Newton's Divided Differences</h3>

            <p>Consider the following set of data points:</p>

            <BlockMath math="
(x_1, y_1) = (1, 2), \quad (x_2, y_2) = (2, 3), \quad (x_3, y_3) = (3, 5)
"/>
            <ol>
              <li>Step 1: First-order Divided Differences:

                <p>First, calculate the first-order divided differences:</p>
                <BlockMath math="
a_0 = f(x_1) = y_1 = 2
"/>
                <BlockMath math="
a_1 = [f(x_1, x_2)] = \frac{f(x_2) - f(x_1)}{x_2 - x_1} = \frac{3 - 2}{2 - 1} = 1
"/>
                <BlockMath math="
a_2 = [f(x_2, x_3)] = \frac{f(x_3) - f(x_2)}{x_3 - x_2} = \frac{5 - 3}{3 - 2} = 2
"/>
              </li>
              <li>Step 2: Second-order Divided Difference:

                <p>Next, calculate the second-order divided difference:</p>
                <BlockMath math="
a_3 = [f(x_1, x_2, x_3)] = \frac{[f(x_2, x_3)] - [f(x_1, x_2)]}{x_3 - x_1} = \frac{2 - 1}{3 - 1} = \frac{1}{2}
"/>
              </li>
              <li>Step 3: Construct the Polynomial:

                <p>Now, construct the Newton interpolation polynomial:</p>
                <BlockMath math="
P(x) = a_0 + a_1(x - x_1) + a_2(x - x_1)(x - x_2)
"/>
                Substitute the values for <InlineMath math=" a_0, a_1, a_2 "/>:
                <BlockMath math="
P(x) = 2 + 1(x - 1) + \frac{1}{2}(x - 1)(x - 2)
"/>
                Simplify the expression:
                <BlockMath math="
P(x) = 2 + (x - 1) + \frac{1}{2}(x - 1)(x - 2)
  "/></li>
            </ol>
            <h3> Advantages of Newton's Divided Differences</h3>
            <ol>
              <li>Efficient Updates: When new data points are added, the polynomial can be updated efficiently by
                calculating just a few new divided differences, without needing to recalculate the entire polynomial.
              </li>
              <li>No Need to Recompute All Terms: The structure of the divided differences allows for easy computation
                of new polynomials as data points are added, making it more efficient than other interpolation methods
                like Lagrange.
              </li>
              <li>Flexibility: The Newton form is well-suited for cases where interpolation is needed on an
                incrementally growing set of data.
              </li>
            </ol>
            <h3> Disadvantages of Newton's Divided Differences</h3>
            <ol>
              <li>Numerical Stability: While divided differences are generally efficient, they can sometimes suffer
                from numerical instability when the data points are poorly conditioned, particularly for high-degree
                polynomials.
              </li>
              <li>Polynomial Oscillation: For large sets of data points, high-degree interpolating polynomials may
                exhibit Runge’s phenomenon, where the polynomial oscillates wildly between data points, especially
                at the ends of the interval.
              </li>
            </ol>
            <h3> Summary</h3>

            <p>Newton's Divided Differences is an efficient method for constructing interpolation polynomials. By
              recursively calculating divided differences, the method builds the coefficients for the Newton form of the
              interpolating polynomial. It has the advantage of being able to efficiently update the polynomial as new
              data points are added, which makes it highly useful in dynamic settings. However, like other interpolation
              methods, it can encounter stability issues with large or poorly conditioned data sets.</p>

          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={3}>
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

export default DividedDifferences