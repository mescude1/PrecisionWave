import React from 'react'

const InstructionsTable = () => {

  return(<>
  <div className="flex gap-3">
    <table className="table">
      <tr>
        <th>Function</th>
        <th>Calculator</th>
      </tr>
      <tr>
        <td>Inverse cosine</td>
        <td>acos(x)</td>
      </tr>
      <tr>
        <td>cosine</td>
        <td>cos(x)</td>
      </tr>

      <tr>
        <td>inverse sine</td>
        <td>asin(x)</td>
      </tr>

      <tr>
        <td> sine</td>
        <td>sin(x)</td>
      </tr>

      <tr>
        <td>inverse tangent</td>
        <td>atan(x)</td>
      </tr>

      <tr>
        <td> tangent</td>
        <td>tan(x)</td>
      </tr>
    </table>

    <table className="table">
      <tr>
        <th>Function</th>
        <th>Calculator</th>
      </tr>
      <tr>
        <td> Absolute value</td>
        <td>abs(x)</td>
      </tr>
      <tr>
        <td>Round a value towards plus infinity</td>
        <td>ceil(x)</td>
      </tr>

      <tr>
        <td>Round a value towards minus infinity</td>
        <td>floor(x)</td>
      </tr>

      <tr>
        <td> Calculate the exponential of a value.</td>
        <td>exp(x)</td>
      </tr>

      <tr>
        <td>Calculates the power of x to y</td>
        <td>pow(x,y)</td>
      </tr>

      <tr>
        <td> tangent</td>
        <td>tan(x)</td>
      </tr>
    </table>
  </div>
</>)
}

export default InstructionsTable