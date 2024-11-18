from pandas import DataFrame
from app.helpers.function_parser import string_function_evaluator


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
        f_x0 = string_function_evaluator(f,x0)
        f_x1 = string_function_evaluator(f,x1)

        # Avoid division by zero
        if f_x1 == f_x0:
            raise ValueError("Division by zero encountered in the secant method.")

        # Secant method formula
        x2 = x1 - f_x1 * (x1 - x0) / (f_x1 - f_x0)

        # Check for convergence
        if abs(x2 - x1) < tol:
            result = {'i': i,
                      'x_i': x1,
                      'f_x_i': x2,
                      'e': abs(x2 - x1)}
            result_array.append(result)

            return x2, i+1, True, DataFrame(result_array)

        # add results to list
        result = {'i': i,
                  'x_i': x1,
                  'f_x_i': x2,
                  'e': abs(x2 - x1)}
        result_array.append(result)

        # Update guesses
        x0, x1 = x1, x2

    raise ValueError("Secant method did not converge within the maximum number of iterations.")
