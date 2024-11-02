import numpy as np
import pandas as pd


def vandermonde_matrix(x_values):
    """
    Generate the Vandermonde matrix for a given list of x-coordinates.

    Parameters:
    x_values (list or array-like): List of x-coordinates of the data points.

    Returns:
    DataFrame: The Vandermonde matrix as a pandas DataFrame.
    """
    # Create a Vandermonde matrix using NumPy
    V = np.vander(x_values, increasing=True)

    # Convert the matrix to a DataFrame for easier viewing
    df_vandermonde = pd.DataFrame(V, columns=[f"x^{i}" for i in range(len(x_values))])

    return df_vandermonde


# Given x-values
x = [-2, -1, 0, 1]
vandermonde_df = vandermonde_matrix(x)
print("Vandermonde Matrix:")
print(vandermonde_df)
