import math

from pandas import DataFrame


def secant_method(f, x0, x1, tol=1e-7, max_iter=100):
    """
    Secant method to find the root of a function f.

    Parameters:
    f : function
        The function for which we are trying to find a root.
    x0 : float
        Initial guess 1.
    x1 : float
        Initial guess 2.
    tol : float, optional
        Tolerance for stopping the iteration. Default is 1e-6.
    max_iter : int, optional
        Maximum number of iterations. Default is 100.

    Returns:
    float
        The root of the function f.
    """
    result_array = []

    for i in range(max_iter):
        # Calculate the value of f at the two initial guesses
        f_x0 = f(x0)
        f_x1 = f(x1)

        # Avoid division by zero
        if f_x1 == f_x0:
            raise ValueError("Division by zero encountered in the secant method.")

        # Secant method formula
        x2 = x1 - f_x1 * (x1 - x0) / (f_x1 - f_x0)

        # Check for convergence
        if abs(x2 - x1) < tol:
            result = {'i': i,
                      'x_i': x1,
                      'f_xi': x2,
                      'e': abs(x2 - x1)}
            result_array.append(result)
            print(DataFrame(result_array))
            print(f"Converged after {i + 1} iterations.")
            return x2

        # add results to list
        result = {'i': i,
                  'x_i': x1,
                  'f_xi': x2,
                  'e': abs(x2 - x1)}
        result_array.append(result)

        # Update guesses
        x0, x1 = x1, x2

    raise ValueError("Secant method did not converge within the maximum number of iterations.")


# Example usage

def f(x):
    return math.log(math.sin(x)**2 + 1) - 1/2


x0 = 0.5
x1 = 1

root = secant_method(f, x0, x1)
print(f"The root is: {root}")
