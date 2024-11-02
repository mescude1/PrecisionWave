import sympy as sp


def lagrange_polynomial(x_values, y_values):
    """
    Compute the Lagrange polynomial for a given set of data points.

    Parameters:
    x_values (list or array-like): List of x-coordinates of the data points.
    y_values (list or array-like): List of y-coordinates of the data points.

    Returns:
    sympy.Expr: The Lagrange polynomial as a symbolic expression.
    """
    if len(x_values) != len(y_values):
        raise ValueError("x_values and y_values must have the same length.")

    # Define the symbolic variable for the polynomial
    x = sp.symbols('x')

    # Initialize the polynomial
    polynomial = 0

    # Construct the Lagrange polynomial
    n = len(x_values)
    for i in range(n):
        # Start with the y value for this term
        term = y_values[i]

        # Multiply by each Lagrange basis polynomial
        for j in range(n):
            if j != i:
                term *= (x - x_values[j]) / (x_values[i] - x_values[j])

        # Add this term to the polynomial
        polynomial += term

    # Simplify the polynomial expression
    return sp.simplify(polynomial)
