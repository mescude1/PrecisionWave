import sympy as sp
import pandas as pd


def newton_divided_difference_table(x_values, y_values):
    """
    Compute the Newton polynomial divided difference table for a given set of data points and
    return the table in a DataFrame.

    Parameters:
    x_values (list or array-like): List of x-coordinates of the data points.
    y_values (list or array-like): List of y-coordinates of the data points.

    Returns:
    tuple: A DataFrame showing the divided difference table, and sympy.Expr representing the Newton polynomial.
    """
    if len(x_values) != len(y_values):
        raise ValueError("x_values and y_values must have the same length.")

    # Number of points
    n = len(x_values)

    # Initialize divided differences table with y-values
    divided_differences = [y_values[:]]  # First column is y-values

    # Calculate divided differences and store each column
    for i in range(1, n):
        column = []
        for j in range(n - i):
            diff = (divided_differences[i - 1][j + 1] - divided_differences[i - 1][j]) / (x_values[j + i] - x_values[j])
            column.append(diff)
        divided_differences.append(column)

    # Create a DataFrame from the divided differences table
    table_dict = {"f[{}]".format(i): col + [None] * (n - len(col)) for i, col in enumerate(divided_differences)}
    table_df = pd.DataFrame(table_dict)

    # Create symbolic variable for the polynomial
    x = sp.symbols('x')

    # Construct the Newton polynomial
    polynomial = divided_differences[0][0]
    for i in range(1, n):
        term = divided_differences[i][0]
        for j in range(i):
            term *= (x - x_values[j])
        polynomial += term

    # Simplify the polynomial expression
    polynomial = sp.simplify(polynomial)

    return table_df, polynomial

# Compute the divided difference table and Newton polynomial
table_df, polynomial = newton_divided_difference_table(x_values=[1,2,3,4,5,6], y_values=[-1,1.5,45/50,2,0,1])
print("Divided Difference Table:")
print(table_df)
print("\nNewton Polynomial:", polynomial)


print(polynomial.subs('x', 3.5))