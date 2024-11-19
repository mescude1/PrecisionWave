import React from "react";

import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';


const JacobiTheory = () => {
  return (<>
The <strong>Jacobi method</strong> is an iterative technique for solving systems of linear equations,
            specifically for systems of the form <InlineMath math=" A \mathbf{x} = \mathbf{b} "/>. The method is
            particularly effective when the coefficient matrix <InlineMath math=" A "/> is <strong>diagonally
            dominant</strong> or <strong>symmetric positive definite</strong>. Unlike direct methods (such as Gaussian
            elimination), the Jacobi method starts with an initial guess and refines it iteratively until convergence.

            <h3> How the Jacobi Method Works</h3>

            <p>For a system of <InlineMath math=" n "/> linear equations represented by the matrix equation:</p>
            <BlockMath math="A \mathbf{x} = \mathbf{b}"/>
            <p>where <InlineMath math=" A "/> is decomposed as:</p>
            <BlockMath math="A = D + R"/>
            <p>with:</p>
            <ul>
              - <InlineMath math=" D "/> being the <strong>diagonal matrix</strong> containing only the diagonal
              elements of <InlineMath math=" A "/>.
              - <InlineMath math=" R "/> representing the <strong>remaining elements</strong> of <InlineMath
              math=" A "/>, consisting of the off-diagonal entries.
            </ul>
            <p>We can rewrite the equation as:</p>
            <BlockMath math="D \mathbf{x} = \mathbf{b} - R \mathbf{x}"/>
            <p>or equivalently:</p>
            <BlockMath math="\mathbf{x} = D^{-1} (\mathbf{b} - R \mathbf{x})"/>
            <p>This leads to an iterative formula for the Jacobi method:</p>
            <BlockMath math="x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j \neq i} a_{ij} x_j^{(k)} \right)"/>
            <p>where:</p>
            <ul>
              - <InlineMath math=" x_i^{(k+1)} "/> is the value of the <InlineMath math=" i "/>-th variable at
              the <InlineMath math=" (k+1) "/>-th iteration.
              - <InlineMath math=" a_{ii} "/> is the <InlineMath math=" i "/>-th diagonal element of <InlineMath
              math=" A "/>.
              - <InlineMath math=" b_i "/> is the <InlineMath math=" i "/>-th element of <InlineMath
              math=" \mathbf{b} "/>.
              - <InlineMath math=" x_j^{(k)} "/> is the value of the <InlineMath math=" j "/>-th variable from
              the <InlineMath math=" k "/>-th iteration.
            </ul>
            <p>Each variable <InlineMath math=" x_i "/> is updated independently using the values from the previous
              iteration, making the Jacobi method easy to parallelize.</p>p

            <h3> Steps of the Jacobi Method</h3>
            <ol>
              <li>Initial Guess: Start with an initial guess for <InlineMath math=" \mathbf{x} "/>, often <InlineMath
                math=" \mathbf{x}^{(0)} = [0, 0, \dots, 0]^T "/>.
              </li>
              <li>Iterative Update:</li>
              <ul>
                <li>For each element <InlineMath math=" x_i "/>, compute <InlineMath math=" x_i^{(k+1)} "/> using the
                  formula above.
                </li>
              </ul>
              <li>Convergence Check:</li>
              <ul>
                <li>Repeat the process until the values converge within a specified tolerance, usually when <InlineMath
                  math=" \|\mathbf{x}^{(k+1)} - \mathbf{x}^{(k)}\| < \epsilon "/> for some small <InlineMath
                  math=" \epsilon "/>.
                </li>
              </ul>
            </ol>
            <h3> Example of the Jacobi Method</h3>

            <p>Consider the following system of linear equations:</p>
            <BlockMath math="3x + y - z = 1"/>
            <BlockMath math="x + 4y + z = 2"/>
            <BlockMath math="-x + y + 5z = 3"/>
            <p>This can be written in matrix form as:</p>
            <BlockMath math="A \mathbf{x} = \mathbf{b}"/>
            <p>where:</p>
            <BlockMath math="A = \begin{bmatrix} 3 & 1 & -1 \\ 1 & 4 & 1 \\ -1 & 1 & 5 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}"/>
            <ol>
              <li>Set Up the Iterative Formulas:</li>
              <p>Using the Jacobi formula for each variable, we get:</p>
              <ul>
                <li>For <InlineMath math=" x "/>:</li>
                <BlockMath math="x^{(k+1)} = \frac{1}{3} \left( 1 - y^{(k)} + z^{(k)} \right)"/>
                <li>For <InlineMath math=" y "/>:</li>
                <BlockMath math="y^{(k+1)} = \frac{1}{4} \left( 2 - x^{(k)} - z^{(k)} \right)"/>
                <li>For <InlineMath math=" z "/>:</li>
                <BlockMath math="z^{(k+1)} = \frac{1}{5} \left( 3 + x^{(k)} - y^{(k)} \right)"/>
              </ul>
              <li>Start with Initial Guess:</li>
              <p>Assume <InlineMath math=" \mathbf{x}^{(0)} = [0, 0, 0]^T "/>.</p>

              <li>Iterate:</li>
              <ul>
                <li><strong>Iteration 1</strong>:</li>
                <ul>
                  <li><InlineMath math=" x^{(1)} = \frac{1}{3}(1 - 0 + 0) = \frac{1}{3} \approx 0.333 "/></li>
                  <li><InlineMath math=" y^{(1)} = \frac{1}{4}(2 - 0 - 0) = \frac{1}{2} = 0.5 "/></li>
                  <li><InlineMath math=" z^{(1)} = \frac{1}{5}(3 + 0 - 0) = 0.6 "/></li>
                </ul>
                <li><strong>Iteration 2</strong>:</li>
                <ul>
                  <li>Use <InlineMath math=" x^{(1)}, y^{(1)}, z^{(1)} "/> to calculate <InlineMath
                    math=" x^{(2)}, y^{(2)}, z^{(2)} "/>, and so forth.
                  </li>
                </ul>
              </ul>
              <li>Convergence:</li>
              <ul>
                <li>Continue until <InlineMath math=" \| \mathbf{x}^{(k+1)} - \mathbf{x}^{(k)} \| "/> is below a
                  specified tolerance level.
                </li>
              </ul>
            </ol>
            <h3> Convergence Conditions</h3>

            <p>The Jacobi method converges if the matrix <InlineMath math=" A "/> is:</p>
            <ol>
              <li>Diagonally Dominant: <InlineMath math=" |a_{ii}| > \sum_{j \neq i} |a_{ij}| "/> for each <InlineMath
                math=" i "/>.
              </li>
              <li>Symmetric Positive Definite: This also guarantees convergence in many cases.</li>
            </ol>
            <h3> Advantages and Disadvantages of the Jacobi Method</h3>
            <ul>
              <li><strong>Advantages</strong>:</li>
              <ul>
                <li>Simple and easy to implement.</li>
                <li>Suitable for parallel computation since each <InlineMath math=" x_i "/> in a new iteration depends
                  only on values from the previous iteration.
                </li>
              </ul>
              <li><strong>Disadvantages</strong>:</li>
              <ul>
                <li>Convergence can be slow, especially for large matrices or matrices that are not strongly diagonally
                  dominant.
                </li>
                <li>Might not converge if <InlineMath math=" A "/> lacks diagonal dominance or symmetry.</li>
              </ul>
            </ul>
            <p>The Jacobi method is primarily used in cases where the matrix is diagonally dominant and where a
              parallelized solution is advantageous. For faster convergence, other methods like the Gauss-Seidel or
              Successive Over-Relaxation (SOR) methods are often preferred.</p>  </>)
}

export default JacobiTheory