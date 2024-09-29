from numpy._core._multiarray_umath import sqrt, sin
import pandas as pd


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
    if f(a) * f(b) >= 0:
        raise ValueError("f(a) and f(b) must have opposite signs.")
    c = (a + b) / 2  # Midpoint initial
    result_array = []
    for i in range(max_iterations):
        c = (a + b) / 2  # Midpoint
        if abs(b - a) < tolerance or abs(f(c)) < tolerance:
            df_result = pd.DataFrame(data=result_array)
            print(df_result)
            return c, i + 1, True, df_result  # Converged

        # Narrow the interval based on the sign of f(c)
        if f(a) * f(c) < 0:
            b = c  # The root is in [a, c]
        else:
            a = c  # The root is in [c, b]

        result = {'i': i, 'x_i': c, 'f_x_i': f(c), 'e': abs(b - a)}
        result_array.append(result)

    return c, max_iterations, False  # Did not converge within max_iterations


# Example usage
import math

# Define a function f(x)
f = lambda x: x ** 3 - x - 2


def f_x_quiz(x):
    return x**3 - sqrt(x**2*(x+2)) - sin(x)**4 + 1


def f_x_parcial(x):
    return x**2 - x + 1 - math.exp(x) + 45/200

def f_x(x):
    return math.log((math.sin(x)**2) + 1 ) - 1/2


# Apply the bisection method
root, iterations, converged, df_result= bisection_method(f_x, -0, 1)

print(f"Root: {root}")
print(f"Iterations: {iterations}")
print(f"Converged: {converged}")
print(f"series:{df_result}")