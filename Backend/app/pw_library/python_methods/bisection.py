
import pandas as pd

from app.helpers.function_parser import string_function_evaluator


def bisection_method(f, a, b, tolerance=1e-7, max_iterations=100):
    """
    Bisection method to find the root of f(x) in the interval [a, b].

    Parameters:
    f : function
        The function for which we are trying to find a root.
    a, b : float
        The interval [a, b] in which the root is located.
    tolerance : float, optional
        The stopping criterion for the algorithm.
    max_iterations : int, optional
        The maximum number of iterations to perform.

    Returns:
    c : float
        The approximate root.
    iterations : int
        The number of iterations performed.
    converged : bool
        Whether the algorithm converged or not.
    """
    f_a = string_function_evaluator(f, a)
    f_b = string_function_evaluator(f, b)
    if (f_a * f_b) >= 0:
        raise ValueError("f(a) and f(b) must have opposite signs.")
    c = (a + b) / 2  # Midpoint initial
    result_array = []
    for i in range(max_iterations):
        c = (a + b) / 2  # Midpoint
        f_c = string_function_evaluator(f, c)
        if abs(b - a) < tolerance or abs(f_c) < tolerance:
            df_result = pd.DataFrame(data=result_array)
            return c, i + 1, True, df_result  # Converged

        # Narrow the interval based on the sign of f(c)
        if f_a * f_c < 0:
            b = c  # The root is in [a, c]
        else:
            a = c  # The root is in [c, b]

        result = {'i': i, 'x_i': c, 'f_x_i': f_c, 'e': abs(b - a)}
        result_array.append(result)

    return c, max_iterations, False  # Did not converge within max_iterations