import pandas as pd

from Backend.app.pw_library.python_methods.gaussian_elimination import gaussian_elimination_verbose


def vandermonde_linear_regression(x, y, degree=1):
    """
    Performs polynomial regression using the Vandermonde matrix method.

    Parameters:
    x (list of float): Input values.
    y (list of float): Output values.
    degree (int): Degree of the polynomial (1 for linear regression).

    Returns:
    list of float: Coefficients of the polynomial in ascending order.
    """
    # Number of data points
    n = len(x)

    # Construct the Vandermonde matrix
    V = [[x[i] ** j for j in range(degree + 1)] for i in range(n)]

    # Compute (V^T * V) and (V^T * y)
    V_transpose = [[V[j][i] for j in range(n)] for i in range(degree + 1)]
    VTV = [[sum(V_transpose[i][k] * V[k][j] for k in range(n)) for j in range(degree + 1)] for i in range(degree + 1)]
    VTy = [sum(V_transpose[i][k] * y[k] for k in range(n)) for i in range(degree + 1)]

    # Display VTV as a DataFrame
    VTV_df = pd.DataFrame(VTV, columns=[f'a{j}' for j in range(degree + 1)], index=[f'a{i}' for i in range(degree + 1)])

    # Display VTy as part of the system
    VTy_df = pd.DataFrame(VTy, index=[f'a{i}' for i in range(degree + 1)], columns=['b'])

    # Solve the system VTV * a = VTy for the coefficients a
    a = gaussian_elimination_verbose(VTV, VTy)

    return a, VTV_df, VTy_df
