import React from 'react'
import {BlockMath, InlineMath} from 'react-katex';
import 'katex/dist/katex.min.css';


const GaussianEliminationTheory = () => {
  return (<>
    <p><strong>Gaussian elimination</strong> is a method for solving linear systems of equations by transforming
      the system's augmented matrix into an upper triangular form. This transformation allows us to solve the
      system using <strong>back substitution</strong>. Gaussian elimination can be performed with or
      without <strong>pivoting</strong> to ensure numerical stability and avoid division by small or zero
      elements.</p>

    <h3> Gaussian Elimination Without Pivoting</h3>

    <p>In <strong>Gaussian elimination without pivoting</strong>, the algorithm proceeds directly by eliminating
      elements below the pivot element in each column, without changing the row order. Here’s a step-by-step
      outline:</p>
    <ol>
      <li>Set Up the Matrix: Write the system of equations as an augmented matrix <InlineMath math=" A|b "/>.
      </li>

      <li>Forward Elimination:</li>
      <ul>
        <li> For each column <InlineMath math=" i "/> (from the first to the second-to-last), select the
          diagonal element <InlineMath math=" a_{ii} "/> as the pivot.
        </li>
        <li> For each row <InlineMath math=" j "/> below <InlineMath math=" i "/> (i.e., <InlineMath
          math=" j > i "/>), eliminate the element <InlineMath math=" a_{ji} "/> by subtracting a multiple of
          row <InlineMath math=" i "/> from row <InlineMath math=" j "/> so that <InlineMath
            math=" a_{ji} = 0 "/>.
        </li>
      </ul>
      <li>Back Substitution:</li>
      <ul>
        <li> After obtaining an upper triangular matrix, solve for each variable starting from the last row up
          to the first.
        </li>
      </ul>
    </ol>
    <h4> Example</h4>
    <p>Consider the system:</p>
    <BlockMath math="
              \begin{align*}
              2x + 3y + z &= 1 \\
              4x + y - 2z &= -2 \\
              3x + 2y + 3z &= 3
              \end{align*}
              "/>
    <p>The augmented matrix is:</p>
    <BlockMath math="
              \begin{bmatrix}
              2 & 3 & 1 & | & 1 \\
              4 & 1 & -2 & | & -2 \\
              3 & 2 & 3 & | & 3
              \end{bmatrix}
            "/>
    <ol>
      <li> Pivot in the First Column:</li>
      <ul>
        <li> Use <InlineMath math=" a_{11} = 2 "/> to eliminate the entries below it:</li>
        <li> Row 2: <InlineMath math=" R_2 - 2R_1 "/></li>
        <li> Row 3: <InlineMath math=" R_3 - 1.5R_1 "/></li>
      </ul>
      <li> Pivot in the Second Column (and so on):</li>
      <ul>
        <li> Continue the elimination process without switching rows.</li>
      </ul>
    </ol>
    <p>This approach can fail if any pivot <InlineMath math=" a_{ii} = 0 "/> because it leads to division by
      zero. It’s also less stable numerically because small values on the diagonal can cause large round-off
      errors.</p>

    <h3> Gaussian Elimination with Partial Pivoting</h3>

    <strong>Partial pivoting</strong> improves the stability of Gaussian elimination by choosing the largest
    absolute value in each column (in rows below or including the current pivot row) as the pivot element. This
    helps avoid division by small numbers, reducing the risk of numerical errors.
    <ol>
      <li>Forward Elimination with Partial Pivoting:</li>
      <ul>
        <li> For each column <InlineMath math=" i "/>, find the row <InlineMath math=" r "/> where <InlineMath
          math=" |a_{ri}| "/> is the largest among rows <InlineMath math=" i "/> to <InlineMath math=" n
      "/>.
        </li>
        <li> Swap row <InlineMath math=" i "/> with row <InlineMath math=" r "/> so that <InlineMath
          math=" a_{ii} "/> is the largest possible absolute value.
        </li>
        <li> Proceed with forward elimination as in regular Gaussian elimination.</li>
      </ul>
      <li>Back Substitution:</li>
      <ul>
        <li> Once in upper triangular form, use back substitution as before.</li>
      </ul>
    </ol>
    <h4> Example</h4>
    <p>Using the previous system:</p>
    <ol>
      <li>Pivot in the First Column:</li>
      <ul>
        <li> The largest element in the first column is 4 (in Row 2). Swap Row 1 and Row 2.</li>
        <li> Proceed with forward elimination on this modified matrix.</li>
      </ul>
    </ol>
    <p>This makes Gaussian elimination more stable by reducing rounding errors and preventing division by small
      numbers.</p>

    <h3> Gaussian Elimination with Full Pivoting</h3>

    <p><strong>Full pivoting</strong> (or <strong>complete pivoting</strong>) is a further refinement where the
      algorithm chooses the largest absolute element in the entire remaining sub-matrix for each pivot position.
      This involves both row and column swapping to ensure that the pivot element is as large as possible.
      Although even more stable than partial pivoting, it is rarely used in practice due to its computational
      cost.</p>
    <ol>
      <li>Forward Elimination with Full Pivoting:</li>
      <ul>
        <li> For each column <InlineMath math=" i "/>, search the entire remaining submatrix (below and to the
          right of the current pivot)
          for the largest absolute value.
        </li>
        <li> Swap both rows and columns to bring this element to the <InlineMath math=" i, i "/> position.</li>
        <li> Proceed with forward elimination.</li>
      </ul>
      <li>Back Substitution:</li>
      <ul>
        <li> Once an upper triangular matrix is obtained, perform back substitution.</li>
        <li> If columns were swapped, adjust the variable order at the end to reflect the changes.</li>
      </ul>
    </ol>
    <h3>Summary of Each Method’s Usefulness</h3>
    <ul>
      <li><strong>No Pivoting</strong>: Simple but may lead to numerical instability or failure when the matrix
        has zeros or very small values on the diagonal.
      </li>
      <li><strong>Partial Pivoting</strong>: Often sufficient to avoid instability. It’s a common choice since
        it’s more stable than no pivoting and only requires row swaps.
      </li>
      <li><strong>Full Pivoting</strong>: Most stable, but computationally intensive due to both row and
        column
        swaps. Generally only used in special cases with severe stability issues.
      </li>
    </ul>
  </>)
}

export default GaussianEliminationTheory