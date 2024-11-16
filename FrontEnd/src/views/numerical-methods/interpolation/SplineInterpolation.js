import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {CCard, CCardBody, CCardHeader, CCol, CRow,} from '@coreui/react'

const SplineInterpolation = () => {
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Theory</strong>
          </CCardHeader>
          <CCardBody>
            <h2>Spline Interpolation</h2>
            <p>**Spline Interpolation** is a method of interpolation where the goal is to find a smooth curve that
              passes through a set of data points. Unlike polynomial interpolation, which often leads to high-degree
              polynomials with undesirable oscillations (especially for large datasets), spline interpolation uses
              piecewise polynomials (called splines) that are joined smoothly at the data points.</p>

            <p>The most common form of spline interpolation is **cubic spline interpolation**, where each piece of the
              piecewise polynomial is a cubic polynomial. The cubic spline has the advantage of being computationally
              efficient and producing smooth, well-behaved curves even for large datasets.</p>

            <h3> Key Features of Spline Interpolation</h3>

            1. **Piecewise Polynomials**: The interpolated curve is made up of polynomial segments that are defined
            between each pair of adjacent data points.
            2. **Smoothness**: The key feature of spline interpolation is that it ensures smoothness at the data points,
            meaning the first and second derivatives of the polynomial segments are continuous at the points where they
            meet.
            3. **Cubic Polynomials**: In cubic spline interpolation, each segment is a cubic polynomial, and the
            continuity conditions ensure that the polynomial pieces fit together smoothly.

            <h3> General Steps in Spline Interpolation</h3>

            1. **Divide the Interval**: Suppose you are given <InlineMath math=" n "/> data points <InlineMath
            math=" (x_1, y_1), (x_2, y_2), \dots, (x_n, y_n) "/>. Spline interpolation involves finding a cubic
            polynomial for each pair of consecutive data points <InlineMath math=" (x_i, y_i) "/> and <InlineMath
            math=" (x_{i+1}, y_{i+1}) "/>, for <InlineMath math=" i = 1, 2, \dots, n-1 "/>.

            2. **Set Up the System of Equations**: For each interval between data points, a cubic polynomial is assumed:
            <BlockMath math="
   S_i(x) = a_i (x - x_i)^3 + b_i (x - x_i)^2 + c_i (x - x_i) + d_i
   "/>
            where <InlineMath math=" S_i(x) "/> is the cubic spline for the <InlineMath math=" i "/>-th interval. The
            constants <InlineMath math=" a_i, b_i, c_i, "/> and <InlineMath math=" d_i "/> are determined by solving a
            system of equations that enforce the following conditions:
            - **Interpolation Condition**: The spline must pass through the given data points. This means <InlineMath
            math=" S_i(x_i) = y_i "/> and <InlineMath math=" S_i(x_{i+1}) = y_{i+1} "/>.
            - **First Derivative Continuity**: The first derivative of the spline must be continuous across adjacent
            intervals. That is, <InlineMath math=" S_i'(x_{i+1}) = S_{i+1}'(x_{i+1}) "/>.
            - **Second Derivative Continuity**: The second derivative of the spline must also be continuous across
            adjacent intervals, i.e., <InlineMath math=" S_i''(x_{i+1}) = S_{i+1}''(x_{i+1}) "/>.
            - **Natural Spline Condition (Optional)**: For a **natural cubic spline**, the second derivative at the
            endpoints <InlineMath math=" x_1 "/> and <InlineMath math=" x_n "/> is set to zero, i.e., <InlineMath
            math=" S_1''(x_1) = 0 "/> and <InlineMath math=" S_n''(x_n) = 0 "/>. This ensures that the spline behaves
            like a straight line at the boundaries.

            3. **Solve the System**: After setting up the system of equations based on these conditions, the values of
            the coefficients <InlineMath math=" a_i, b_i, c_i, d_i "/> are solved for. This typically involves solving a
            **tridiagonal system of equations** for the coefficients of the cubic polynomials.

            4. **Construct the Spline**: Once the coefficients are known, the spline is completely defined, and the
            curve can be used to interpolate values at any <InlineMath math=" x "/>-value within the interval.

            <h3> The Spline Formula for Each Interval</h3>

            Each cubic spline <InlineMath math=" S_i(x) "/> is typically written as:
            <BlockMath math="
S_i(x) = a_i (x - x_i)^3 + b_i (x - x_i)^2 + c_i (x - x_i) + d_i
"/>
            Where:
            - <InlineMath math=" a_i, b_i, c_i, d_i "/> are the coefficients to be determined.
            - <InlineMath math=" S_i(x) "/> is the cubic spline in the <InlineMath math=" i "/>-th interval,
            specifically between <InlineMath math=" x_i "/> and <InlineMath math=" x_{i+1} "/>.

            <h3> System of Equations</h3>

            <p>To find the coefficients <InlineMath math=" a_i, b_i, c_i, d_i "/>, we use the following conditions:</p>
            <ol>
              <li>**Interpolation Condition**:
                <p>For each interval <InlineMath math=" [x_i, x_{i+1}] "/>:</p>
                <BlockMath math="
   S_i(x_i) = y_i \quad \text{and} \quad S_i(x_{i+1}) = y_{i+1}
   "/>
              </li>

              <li>**First Derivative Continuity**:
                <p>The first derivatives of adjacent splines must match at each interior point:</p>
                <BlockMath math="
   S_i'(x_{i+1}) = S_{i+1}'(x_{i+1})
   "/>
              </li>
              <li>**Second Derivative Continuity**:
                <p>The second derivatives of adjacent splines must also match at each interior point:</p>
                <BlockMath math="
   S_i''(x_{i+1}) = S_{i+1}''(x_{i+1})
   "/>
              </li>
              <li>**Natural Spline Condition**:
                <p>For natural splines, the second derivative at the endpoints is zero:</p>
                <BlockMath math="
   S_1''(x_1) = 0 \quad \text{and} \quad S_n''(x_n) = 0
   "/>
              </li>
            </ol>
            <p>This leads to a system of linear equations that can be solved for the spline coefficients.</p>

            <h3> Example of Cubic Spline Interpolation</h3>

            <p>Consider the following set of data points:</p>

            <BlockMath math="
(1, 2), (2, 3), (3, 5)
"/>

            <p>We want to find the cubic spline interpolation that passes through these points.</p>
            <ol>
              <li>**Define the Splines**: We define two cubic splines, <InlineMath math=" S_1(x) "/> for the
                interval <InlineMath math=" [1, 2] "/>, and <InlineMath math=" S_2(x) "/> for the interval <InlineMath
                  math=" [2, 3] "/>.
              </li>

              <li>**Set Up the System**: For each spline, we write the general form of the cubic equation and apply the
                conditions (interpolation, first and second derivative continuity, natural spline conditions) to form a
                system of equations.
              </li>

              <li>**Solve the System**: After setting up the system, we solve for the coefficients <InlineMath
                math=" a_i, b_i, c_i, d_i "/>.
              </li>

              <li>**Construct the Spline**: After solving for the coefficients, the resulting cubic polynomials are used
                to define the spline on each interval.
              </li>
            </ol>
            <h3> Advantages of Spline Interpolation</h3>
            <ol>
              <li>**Smoothness**: Cubic splines provide a smooth interpolation because they enforce continuity in both
                the first and second derivatives.
              </li>
              <li>**No Oscillations**: Unlike high-degree polynomial interpolation (e.g., Lagrange), spline
                interpolation avoids oscillations, particularly in regions with large gaps between data points.
              </li>
              <li>**Piecewise Definition**: The spline is a piecewise polynomial, meaning that each segment is a
                low-degree polynomial, which makes it computationally more efficient and stable than high-degree global
                polynomials.
              </li>
              <li>**Flexibility**: The method can be adapted to different types of boundary conditions (natural spline,
                clamped spline, etc.).
              </li>
            </ol>
            <h3> Disadvantages of Spline Interpolation</h3>
            <ol>
              <li>**Complexity**: While cubic spline interpolation is more stable than high-degree polynomial
                interpolation, it is more complex to implement, as it requires solving a system of linear equations.
              </li>
              <li>**Boundary Conditions**: The choice of boundary conditions can affect the behavior of the spline at
                the endpoints. For example, a natural spline may behave differently at the ends compared to a clamped
                spline.
              </li>
              <li>**Not Extrapolatory**: Like other interpolation methods, spline interpolation is typically only
                reliable within the range of the data points. Extrapolating beyond the data points can lead to
                inaccurate results.
              </li>
            </ol>
            <h3> Summary</h3>

            <p>**Spline interpolation** provides a powerful method for constructing smooth curves through a set of data
              points, particularly using **cubic splines**. The method ensures continuity in both the first and second
              derivatives of the curve, which prevents the oscillations seen in higher-degree polynomial interpolations.
              While it is computationally more efficient and numerically stable compared to polynomial interpolation,
              solving the system of equations for the spline coefficients can be more complex. Nonetheless, it is widely
              used in many fields like computer graphics, data fitting, and numerical analysis.</p>
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

export default SplineInterpolation