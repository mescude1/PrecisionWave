def false_position(f, a, b, tol=1e-6, max_iter=100):
    """
    Perform the False Position method to find a root of the function f in the interval [a, b].

    Parameters:
    f (function): The function for which we are searching for a root.
    a (float): The start of the interval (lower bound).
    b (float): The end of the interval (upper bound).
    tol (float): The tolerance for the root (stopping criterion).
    max_iter (int): The maximum number of iterations allowed.

    Returns:
    float: The approximate root.
    """
    if f(a) * f(b) >= 0:
        raise ValueError("The function must have opposite signs at the endpoints a and b.")

    for i in range(max_iter):
        # Calculate the new point using the false position formula
        x_new = b - (f(b) * (b - a)) / (f(b) - f(a))

        # Check if the result is within the tolerance
        if abs(f(x_new)) < tol:
            return x_new

        # Update the interval based on the sign of f(x_new)
        if f(a) * f(x_new) < 0:
            b = x_new
        else:
            a = x_new

    # If no solution is found within the given number of iterations
    raise RuntimeError("Maximum number of iterations reached without convergence.")


# Example usage
import math


# Define a function
def func(x):
    return math.cos(x) - x  # A root exists near x = 0.739


# Perform the False Position method on the interval [0, 1] with tolerance 1e-6
root = false_position(func, 0, 1, tol=1e-6)

print(f"Root found at: {root}")
