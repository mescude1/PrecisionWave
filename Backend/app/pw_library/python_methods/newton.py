import pandas as pd

from app.helpers.function_parser import string_function_evaluator


def newton_raphson(f, df, x0, tol=1e-7, max_iter=100):
    """
    Solves f(x) = 0 using the Newton-Raphson method.

    Parameters:
    - f: The function whose root we want to find.
    - df: The derivative of the function f.
    - x0: Initial guess for the root.
    - tol: The tolerance for convergence (default is 1e-6).
    - max_iter: Maximum number of iterations (default is 100).

    Returns:
    - The estimated root and the number of iterations taken.
    """
    xn = x0
    result_array = []
    for n in range(0, max_iter):
        fxn = string_function_evaluator(f,xn)
        dfxn = string_function_evaluator(df, xn)

        if abs(xn - (xn - fxn / dfxn)) < tol:
            result = {
                'i:': n,
                'x_i:': xn,
                'f_x_i:': fxn,
                'e': abs(xn - (xn - fxn / dfxn))
            }
            result_array.append(result)
            print(f"Found solution after {n} iterations.")
            print(pd.DataFrame(result_array))
            return xn

        if dfxn == 0:
            print("Zero derivative. No solution found.")
            return None

        result = {
            'i': n,
            'x_i': xn,
            'f_x_i': fxn,
            'e': abs(xn - (xn - fxn / dfxn))
        }
        result_array.append(result)
        # Update the next approximation using Newton-Raphson formula
        xn = xn - fxn / dfxn
    print("Exceeded maximum iterations. No solution found.")
    return None
