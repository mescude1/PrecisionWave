import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';


const SORTheory = () => {
  return (<>
    <p>The <strong>Successive Over-Relaxation (SOR)</strong> method is an improvement of the <strong>Gauss-Seidel
      method</strong> designed to accelerate its convergence. The SOR method introduces a relaxation
      parameter <InlineMath math=" \omega "/> (often called the <strong>relaxation factor</strong>) to adjust
      the weight of the new value in each iteration. By appropriately selecting <InlineMath math=" \omega "/>, SOR
      can often converge faster than Gauss-Seidel, especially for certain types of linear systems.</p>

    <h3> How the SOR Method Works</h3>

    <p>The SOR method modifies the Gauss-Seidel update formula by introducing a relaxation factor <InlineMath
      math=" \omega "/>. The key idea is to use a weighted average of the old value and the newly computed value
      during each iteration. The iterative formula for updating the solution vector is given by:</p>

    <BlockMath math="
x_i^{(k+1)} = (1 - \omega) x_i^{(k)} + \frac{\omega}{a_{ii}} \left( b_i - \sum_{j=1}^{i-1} a_{ij} x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij} x_j^{(k)} \right)
"/>

    <p>Where:</p>
    <ul>
      <li><InlineMath math=" x_i^{(k+1)} "/> is the updated value of the <InlineMath math=" i "/>-th variable at
        the <InlineMath math=" (k+1) "/>-th iteration.
      </li>
      <li><InlineMath math=" a_{ii} "/> is the diagonal element of the matrix <InlineMath math=" A "/>.</li>
      <li><InlineMath math=" b_i "/> is the <InlineMath math=" i "/>-th element of the vector <InlineMath
        math=" \mathbf{b} "/>.
      </li>
      <li><InlineMath math=" x_j^{(k)} "/> are the values of <InlineMath math=" x_j "/> from the previous
        iteration, except for <InlineMath math=" x_j^{(k+1)} "/>, which is updated in the same iteration.
      </li>
    </ul>
    <h3> The Relaxation Factor <InlineMath math=" \omega "/></h3>

    <p>The parameter <InlineMath math=" \omega "/>, called the <strong>relaxation factor</strong>, controls how
      aggressively the method updates the solution:</p>
    <ul>
      <li> If <InlineMath math=" \omega = 1 "/>, the method reduces to <strong>Gauss-Seidel</strong>.</li>
      <li> If <InlineMath math=" 0 < \omega < 1 "/>, the method is called <strong>under-relaxation</strong>,
        which slows down the update, potentially leading to more stability but slower convergence.
      </li>
      <li> If <InlineMath math=" \omega > 1 "/>, the method is called <strong>over-relaxation</strong>, which
        can accelerate convergence, but if chosen poorly, it might lead to instability.
      </li>
    </ul>
    <p>The goal is to choose an optimal value of <InlineMath math=" \omega "/> that speeds up convergence
      without causing instability. In practice, <InlineMath math=" \omega "/> is usually selected based on
      empirical testing or optimization techniques.</p>

    <h3> Steps of the SOR Method</h3>
    <ol>
      <li><strong>Initialize</strong>: Start with an initial guess for the solution vector <InlineMath
        math=" \mathbf{x}^{(0)} "/>.
      </li>
      <li><strong>Iterative Update</strong>:
        <ul>
          <li>For each equation, update each variable <InlineMath math=" x_i^{(k+1)} "/> using the SOR formula.
          </li>
        </ul></li>

      <li><strong>Convergence Check</strong>:
        <ul>
          <li>Repeat the process until the solution converges. The stopping criterion can be based on the
            difference between successive iterates:
            <BlockMath math="
   \| \mathbf{x}^{(k+1)} - \mathbf{x}^{(k)} \| < \epsilon
   "/>
            where <InlineMath math=" \epsilon "/> is a small tolerance value.
          </li>
        </ul>
      </li>
    </ol>
    <h3> Example of the SOR Method</h3>

    <p>Consider the following system of equations:</p>
    <BlockMath math="
3x + y - z = 1
"/>
    <BlockMath math="
x + 4y + z = 2
"/>
    <BlockMath math="
-x + y + 5z = 3
"/>
    <p>This system can be written as <InlineMath math=" A \mathbf{x} = \mathbf{b} "/>, where:</p>
    <BlockMath math="
A = \begin{bmatrix} 3 & 1 & -1 \\ 1 & 4 & 1 \\ -1 & 1 & 5 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}
"/>
    <ol>
      <li>Start with an Initial Guess:
        <p>Assume an initial guess <InlineMath math=" \mathbf{x}^{(0)} = [0, 0, 0]^T "/>.</p></li>

      <li>Choose a Relaxation Factor <InlineMath math=" \omega "/>:
        <p>Choose <InlineMath math=" \omega = 1.25 "/> for over-relaxation (you may try different values to see
          the effect on convergence).</p></li>

      <li>Iterate:
        <p>Using the formula for each <InlineMath math=" x_i^{(k+1)} "/>, update the values in the same order as
          Gauss-Seidel but with the relaxation factor:</p>
        <ul>
          <li>For <InlineMath math=" x^{(k+1)}_1 "/>:</li>
          <BlockMath math="
     x_1^{(k+1)} = (1 - \omega) x_1^{(k)} + \frac{\omega}{3} \left( 1 - y^{(k)} + z^{(k)} \right)
     "/>
          <li>For <InlineMath math=" x^{(k+1)}_2 "/>:</li>
          <BlockMath math="
     x_2^{(k+1)} = (1 - \omega) x_2^{(k)} + \frac{\omega}{4} \left( 2 - x^{(k+1)}_1 - z^{(k)} \right)
     "/>
          <li>For <InlineMath math=" x^{(k+1)}_3 "/>:</li>
          <BlockMath math="
     x_3^{(k+1)} = (1 - \omega) x_3^{(k)} + \frac{\omega}{5} \left( 3 + x^{(k+1)}_1 - y^{(k+1)} \right)
  "/></ul>
      </li>

      <li>Repeat Until Convergence: Continue iterating until the solution converges, i.e., the difference
        between successive guesses is below a chosen tolerance.
      </li>
    </ol>
    <h3> Convergence of the SOR Method</h3>
    <ul>
      <li><strong>Diagonal Dominance</strong>: Like Gauss-Seidel, the SOR method typically converges faster
        for <strong>diagonally dominant</strong> or <strong>symmetric positive-definite</strong> matrices.
      </li>
      <li><strong>Optimal Relaxation Factor</strong>: The choice of <InlineMath math=" \omega "/> is crucial.
        For optimal convergence, <InlineMath math=" \omega "/> should lie between 1 and 2, though its value may
        depend on the specific problem.
      </li>
      <li><strong>Convergence Criterion</strong>: SOR converges if the matrix <InlineMath
        math=" A "/> is <strong>diagonally dominant</strong> or <strong>symmetric positive definite</strong>.
      </li>
    </ul>
    <h3> Advantages and Disadvantages of SOR</h3>
    <lu>
      <li><strong>Advantages</strong>:
        <ul>
          <li><strong>Faster Convergence</strong>: SOR typically converges faster than Gauss-Seidel, especially
            for problems where the matrix is diagonally dominant.
          </li>
          <li><strong>Flexibility</strong>: The relaxation factor <InlineMath math=" \omega "/> allows for
            tuning the convergence speed, enabling better performance on certain problems.
          </li>
          <li><strong>Improved Stability</strong>: Proper choice of <InlineMath math=" \omega "/> can lead to
            more stable and faster convergence compared to Gauss-Seidel.
          </li>
        </ul>
      </li>
      <li><strong>Disadvantages</strong>:
        <lu>
          <li><strong>Choosing <InlineMath math=" \omega "/></strong>: The convergence speed depends heavily on
            choosing an appropriate <InlineMath math=" \omega "/>, which may require trial and error or advanced
            optimization techniques.
          </li>
          <li><strong>Non-Convergence</strong>: If <InlineMath math=" \omega "/> is chosen poorly or if the
            matrix does not satisfy the necessary conditions for convergence, SOR may fail to converge.
          </li>
          <li><strong>Less Parallelizable</strong>: Like Gauss-Seidel, SOR is harder to parallelize than Jacobi
            because each new solution value depends on the updates made within the same iteration.
          </li>
        </lu>
      </li>
    </lu>
    <h3> Summary</h3>

    <p>The <strong>Successive Over-Relaxation (SOR)</strong> method is a modification of the Gauss-Seidel method
      that introduces a relaxation factor <InlineMath math=" \omega "/> to speed up convergence. By
      adjusting <InlineMath math=" \omega "/>, SOR can achieve faster convergence than Gauss-Seidel for certain
      problems, especially those with diagonally dominant or symmetric positive-definite matrices. It is widely
      used for large-scale systems where efficiency is crucial, but selecting the right relaxation factor is key
      to its success.</p>
  </>)
}

export default SORTheory