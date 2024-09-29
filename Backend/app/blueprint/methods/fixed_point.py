import math

from numpy._core._multiarray_umath import sqrt, sin
from pandas import DataFrame
from sympy import diff, sympify
from sympy.core.evalf import evalf


def diff_mask(f):
    sympy_f = sympify(f)
    return diff(sympy_f)


def fixed_point_interval(g, a, b, x0, tolerance=1e-7, max_iterations=100):
    """
    Fixed-point iteration method to solve x = g(x) on the interval [a, b].

    Parameters:
    g : function
        The function g(x) that defines the equation x = g(x).
    a, b : float
        The interval [a, b] in which the fixed point must lie.
    x0 : float
        Initial guess for the solution (must be within [a, b]).
    tolerance : float, optional
        The stopping criterion based on the change between iterations.
    max_iterations : int, optional
        The maximum number of iterations to perform.

    Returns:
    x : float
        The fixed-point solution (if found).
    iterations : int
        The number of iterations performed.
    converged : bool
        Whether the algorithm converged or not.
    """
    # Check if the initial guess is within the interval
    if not (a <= x0 <= b):
        raise ValueError("Initial guess x0 must be within the interval [a, b].")
    result_array = []
    x = x0
    for i in range(max_iterations):
        x_next = g(x)

        # Ensure that x_next stays within the interval [a, b]
        if x_next < a:
            x_next = a
        elif x_next > b:
            x_next = b

        # Check if the difference between consecutive iterations is within the tolerance
        if abs(x_next - x) < tolerance:
            result = {
                'i': i,
                'x_i': x,
                'f_xi': x_next,
                'e': abs(x_next - x)
            }
            result_array.append(result)
            print(DataFrame(result_array))
            return x_next, i + 1, True  # Converged
        result = {
            'i': i,
            'x_i': x,
            'f_xi': x_next,
            'e': abs(x_next - x)
        }
        result_array.append(result)
        x = x_next

    return x, max_iterations, False  # Did not converge within max_iterations


def g_x_1(x):
    """
        Dada función g(x) = e−(x2+x+1) en [−1, 2]
            a) (60%) Demuestre si se cumple o no que g(x) ∈ [−1,2] ∀x ∈ [−1,2] (Detalle el procedimiento.)
            b) (20%) Halle un valor aproximado para la k del teorema de punto fijo.
            c) (20%) ¿Se cumple el teorema de punto fijo? ¿Por qué?
    """
    return math.exp(-(x**2 + x + 1))


def f_x_quiz(x):
    return x**3 - sqrt(x**2*(x+2)) - sin(x)**4 + 1



def g_x_parcial(x):
    return math.log(x**2 - x + 1 + 45/200)


solution, iterations, converged = fixed_point_interval(g=g_x_parcial, x0=0.5, a=-100, b=100)

print(f"Solution: {solution}")
print(f"Iterations: {iterations}")
print(f"Converged: {converged}")