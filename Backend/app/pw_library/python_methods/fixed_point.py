import math

import pandas as pd
import numpy as np

def fixed_point_method(f, g, x0, tol=1e-7, max_iter=1000):
    """
    Fixed-Point Iteration Method to solve f(x) = 0 using x = g(x).

    Parameters:
    f : function
        The original function f(x) for which we are trying to find the root.
    g : function
        The transformation function g(x) used for the fixed-point iteration (x = g(x)).
    x0 : float
        Initial guess for the root.
    tol : float, optional
        Tolerance for convergence. Default is 1e-7.
    max_iter : int, optional
        Maximum number of iterations. Default is 1000.

    Returns:
    x : float
        The approximate root of f(x) = 0.
    iterations : int
        The number of iterations performed.
    converged : bool
        Whether the method converged to a solution.
    result_df : pd.DataFrame
        A DataFrame containing details of each iteration.
    """
    result_array = []
    x = x0

    for i in range(max_iter):
        x_new = g(x)
        f_x_new = f(x_new)
        error = abs(x_new - x)

        result = {
            'Iteration': i + 1,
            'x_i': x_new,
            'f(x_i)': f_x_new,
            'g(x_i)': g(x_new),
            'Error': error
        }
        result_array.append(result)

        # Check for convergence based on tolerance
        if error < tol and abs(f_x_new) < tol:
            result_df = pd.DataFrame(result_array)
            return x_new, i + 1, True, result_df

        # Update for the next iteration
        x = x_new

    # If no convergence after max_iter
    result_df = pd.DataFrame(result_array)
    return x, max_iter, False, result_df
