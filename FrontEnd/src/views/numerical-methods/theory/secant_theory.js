import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';


const SecantTheory = () => {
  return (<>
    <p>The <strong>secant method</strong> is a root-finding algorithm that approximates the derivative of a
      function by using a secant line through two points. Unlike the Newton-Raphson method, the secant method
      does not require the derivative of the function to be known or calculated explicitly, which makes it
      useful for functions where computing the derivative is difficult or impossible.</p>

    <p>The secant method is generally faster than the bisection method and, while not as fast as Newton’s method
      in terms of convergence rate, it can still converge relatively quickly. The method uses two initial
      approximations of the root and iteratively improves them.</p>

    <h3>Steps in the Secant Method</h3>
    <ol>
      <li>Choose Two Initial Approximations:</li>
      <ul>
        <li>Start with two initial guesses, <InlineMath math=" x_0 "/> and <InlineMath math=" x_1 "/>, that are
          reasonably close to the expected
          root.
        </li>
      </ul>
      <li>Iterate Using the Secant Formula:</li>
      <ul>
        <li> Use the formula:</li>
        <BlockMath math="x_{n+1} = x_n - f(x_n) \cdot \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}"/>
        <li>This formula is derived by approximating the derivative with the slope of the secant line between
          the points <InlineMath math="(x_n, f(x_n))"/> and <InlineMath math="(x_{n - 1}, f(x_{n - 1}))"/>.
        </li>
      </ul>
      <li>Update and Check for Convergence:</li>
      <ul>
        <li> After calculating <InlineMath math=" x_{n + 1} "/>, check if the difference <InlineMath
          math=" |x_{n + 1} - x_n| "/> is smaller than
          a specified tolerance level. If so, stop and take <InlineMath math=" x_{n + 1} "/> as the approximate root.
        </li>
        <li> If not, set <InlineMath math=" x_{n - 1} = x_n "/> and <InlineMath math=" x_n = x_{n + 1} "/>, and repeat
          the iteration.
        </li>
      </ul>
      <li>Stop if Convergence is Achieved:</li>
      <ul>
        <li> Continue until the change between successive approximations is within the desired tolerance or a
          maximum number of iterations is reached.
        </li>
      </ul>
    </ol>
    <h3>Example of the Secant Method</h3>

    <p>Suppose we want to find a root of the function <InlineMath math=" f(x) = x^2 - 4 "/>, which has roots
      at <InlineMath math=" x = 2 "/> and
      <InlineMath math=" x = -2 "/>.</p>
    <ol>
      <li>Choose Initial Approximations**: Let’s start with <InlineMath math=" x_0 = 3 "/> and <InlineMath
        math=" x_1 = 2.5 "/>.
      </li>

      <li>First Iteration:</li>
      <ul>
        <li> Calculate <InlineMath math=" f(x_0) = f(3) = 3^2 - 4 = 5 "/>.</li>
        <li> Calculate <InlineMath math=" f(x_1) = f(2.5) = 2.5^2 - 4 = 2.25 "/>.</li>
        <li> Using the secant formula:</li>
        <BlockMath math="x_2 = x_1 - f(x_1) \cdot \frac{x_1 - x_0}{f(x_1) - f(x_0)}"/>
        <BlockMath
          math="x_2 = 2.5 - 2.25 \cdot \frac{2.5 - 3}{2.25 - 5} = 2.5 - 2.25 \cdot \frac{-0.5}{-2.75} \approx 2.0909"/>
      </ul>
      3. **Second Iteration**:
      <ul>
        <li> Update <InlineMath math=" x_0 = 2.5 "/> and <InlineMath math=" x_1 = 2.0909 "/>.</li>
        <li> Calculate <InlineMath math=" f(2.0909) = (2.0909)^2 - 4 \approx 0.3715 "/>.</li>
        <li> Use the secant formula again to calculate <InlineMath math=" x_3 "/>:</li>
        <BlockMath math="x_3 = 2.0909 - 0.3715 \cdot \frac{2.0909 - 2.5}{0.3715 - 2.25} \approx 2.0096"/>
      </ul>
      <li>Repeat Until Convergence</li>
      :
      <ul>
        <li> Continue iterating until the difference between <InlineMath math=" x_n "/> and <InlineMath
          math=" x_{n + 1} "/> is within the
          tolerance level. In this example, the method will quickly converge to the root at <InlineMath
            math=" x = 2 "/> within a
          few more iterations.
        </li>
      </ul>
    </ol>
    <h3>Summary</h3>

    <p>The secant method is a good compromise between simplicity and speed:</p>
    <ul>
      <li><strong>No Derivative Required</strong>: Unlike Newton’s method, the secant method does not require
        the function’s
        derivative, making it useful for functions without easy-to-compute derivatives.
      </li>
      <li><strong>Faster than Bisection</strong>: It typically converges faster than the bisection method
        because it
        uses
        information from both points to estimate the root.
      </li>
      <li><strong>Slower than Newton’s Method</strong>: While it’s generally slower than Newton’s method for
        well-behaved
        functions, it is more robust since it doesn’t rely on the derivative being available.
      </li>
    </ul>
    <p>However, the secant method may fail to converge or converge slowly if the initial guesses are poorly
      chosen or if the function has peculiar behavior, such as oscillations near the root.</p>
  </>)
}

export default SecantTheory