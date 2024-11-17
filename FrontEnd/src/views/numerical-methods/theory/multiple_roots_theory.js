import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';


const MultipleRootsTheory = () => {
  return (<>
    <p>When a function has <strong>multiple roots</strong> (also called <strong>repeated roots</strong>), it
      means that the root has a multiplicity greater than 1. For example, if <InlineMath
        math=" f(x) = (x - 2)^2 "/>, the root <InlineMath math=" x = 2 "/> has multiplicity 2, as the function
      touches the x-axis at <InlineMath math=" x = 2 "/> but does not cross it. Multiple roots present a
      challenge for standard root-finding algorithms, which can struggle with slow convergence or even fail to
      find the root if they’re not adjusted for the multiplicity.</p>

    <h3> Challenges with Multiple Roots</h3>

    <p>For a root with multiplicity <InlineMath math=" m > 1 "/>:</p>
    <ul>
      <li><strong>Slow Convergence</strong>: Methods like Newton-Raphson and secant converge more slowly to
        multiple roots than to simple roots (roots with multiplicity <InlineMath math=" m = 1 "/>).
      </li>
      <li><strong>Failure to Converge</strong>: Some methods, such as the bisection method, can fail to find
        multiple roots because they rely on a sign change in <InlineMath math=" f(x) "/>, which does not occur
        with even-multiplicity roots (e.g., when the graph touches the x-axis but does not cross it).
      </li>
    </ul>
    <h3>Modified Newton-Raphson for Multiple Roots</h3>

    <p>The **Newton-Raphson method** can be modified to handle multiple roots more effectively. If a
      root <InlineMath math=" r "/> has known multiplicity <InlineMath math=" m "/>, we can improve convergence
      by dividing the function by its multiplicity and adjusting the Newton-Raphson iteration formula:</p>
    <ol>

      <li>Original Newton-Raphson Formula:</li>
      <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}"/>

      <li>Modified Newton-Raphson for Multiple Roots:</li>
      <ul>
        <li> If the root has multiplicity <InlineMath math=" m "/>, use:</li>
        <BlockMath math="x_{n+1} = x_n - \frac{m \cdot f(x_n)}{f'(x_n)}"/>
        <li> This adjustment improves convergence by accounting for the flat slope near the root (characteristic
          of higher-multiplicity roots).
        </li>
      </ul>
      <li>Unknown Multiplicity:</li>
      <ul>
        <li> If the multiplicity <InlineMath math=" m "/> is unknown, you can estimate it by using the following
          method:
        </li>
        <li> Compute several iterates using Newton-Raphson without modification and observe the convergence
          rate. Slower convergence than expected suggests a higher multiplicity.
        </li>
      </ul>
    </ol>
    <h3>Example of Modified Newton-Raphson for Multiple Roots</h3>

    <p>Let’s find the root of <InlineMath math=" f(x) = (x - 2)^3 "/>, which has a root at <InlineMath
      math=" x = 2 "/> with multiplicity <InlineMath math=" m = 3 "/>.</p>
    <ol>
      <li>Choose an Initial Guess: Let’s start with <InlineMath math=" x_0 = 3 "/>.</li>

      <li>First Iteration with Modified Newton-Raphson:</li>
      <ul>
        <li>Compute <InlineMath math=" f(x_0) = (3 - 2)^3 = 1 "/>.</li>
        <li>Compute <InlineMath math=" f'(x_0) = 3(x - 2)^2 = 3 \cdot (3 - 2)^2 = 3 "/>.</li>
        <li>Using the modified formula:</li>
        <BlockMath math="x_1 = x_0 - \frac{3 \cdot f(x_0)}{f'(x_0)} = 3 - \frac{3 \cdot 1}{3} = 2"/>
      </ul>
      <li>Convergence in Fewer Steps:</li>

      <p>Here, the modified Newton-Raphson method converges directly to the root <InlineMath math=" x = 2 "/> in
        just one step, thanks to the multiplicity adjustment.</p>
    </ol>
    <h3> Other Techniques for Multiple Roots</h3>

    <p> If the multiplicity <InlineMath math=" m "/> is unknown or hard to account for in the Newton-Raphson
      method, consider these alternatives:</p>
    <ol>
      <li>Deflation:</li>
      <ul>
        <li> If you know one root, you can "deflate" the polynomial by dividing <InlineMath
          math=" f(x) "/> by <InlineMath math=" (x - r)^m "/>, where <InlineMath math=" r "/> is the known root
          and <InlineMath math=" m "/> is its multiplicity.
        </li>
        <li> This will remove the multiple root from <InlineMath math=" f(x) "/>, allowing you to find other
          roots without interference.
        </li>
      </ul>
      <li>Using Derivatives:</li>
      <ul>
        <li> For a function <InlineMath math=" f(x) "/> with a known multiple root at <InlineMath math=" r "/>,
          the root is also a root of <InlineMath math=" f'(x) "/>. Using <InlineMath math=" f'(x) "/> or even
          higher-order derivatives can sometimes simplify finding the root by reducing the function's
          multiplicity near <InlineMath math=" r "/>.
        </li>
      </ul>
      <li>Modified Secant Method:</li>
      <ul>
        <li> For the secant method, the same modification can be applied by scaling <InlineMath
          math=" f(x_n) "/> by the multiplicity <InlineMath math=" m "/>, similar to the Newton-Raphson
          modification.
        </li>
      </ul>
    </ol>
    <h3> Summary</h3>

    <p>Handling multiple roots requires recognizing slower convergence and modifying traditional methods like
      Newton-Raphson to account for root multiplicity. While adjusting for multiplicity speeds up convergence,
      deflation or derivative-based approaches are also useful techniques. These adaptations ensure that
      root-finding algorithms are more efficient and reliable when working with functions that have repeated
      roots.</p>
  </>)
}

export default MultipleRootsTheory