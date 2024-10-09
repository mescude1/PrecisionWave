import math

import numpy as np
from mpmath import ln
from sympy import diff, Function
import pandas as pd

def f(x):
    return math.log(math.sin(x)**2 + 1) - 1/2


def df(x):
    return 2*(math.sin(x)**2 + 1)**-1 * math.sin(x) * math.cos(x)


def newton_raphson(f, df, x0, tol=1e-7, max_iter=30):
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
        fxn = f(xn)
        dfxn = df(xn)

        if abs(xn - (xn - fxn / dfxn)) < tol:
            result = {
                'i:': n,
                'xi:': xn,
                'f_xi:': fxn,
                'E': abs(xn - (xn - fxn / dfxn))
            }
            result_array.append(result)
            print(f"Found solution after {n} iterations.")
            print(pd.DataFrame(result_array))
            return xn

        if dfxn == 0:
            print("Zero derivative. No solution found.")
            return None

        result = {
            'i:': n,
            'xi:': xn,
            'f_xi:': fxn,
            'E': abs(xn - (xn - fxn / dfxn))
        }
        result_array.append(result)
        # Update the next approximation using Newton-Raphson formula
        xn = xn - fxn / dfxn
    print("Exceeded maximum iterations. No solution found.")
    return None


# Find the root
root = newton_raphson(f, df, x0=1.2)

if root is not None:
    print(f"The root is: {root}")