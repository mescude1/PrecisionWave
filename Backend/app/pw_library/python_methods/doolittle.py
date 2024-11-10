import numpy as np

def doolittle_decomposition(A):
    """
    Performs Doolittle decomposition on matrix A.
    Returns matrices L and U such that A = L * U.
    """
    n = A.shape[0]
    L = np.eye(n, dtype=float)  # L starts as an identity matrix
    U = np.zeros((n, n), dtype=float)

    for i in range(n):
        # Calculate elements of U in the i-th row
        for j in range(i, n):
            U[i][j] = A[i][j] - sum(L[i][k] * U[k][j] for k in range(i))

        # Calculate elements of L in the i-th column
        for j in range(i + 1, n):
            if U[i][i] == 0:
                raise ValueError("Matrix is singular; zero pivot encountered.")
            L[j][i] = (A[j][i] - sum(L[j][k] * U[k][i] for k in range(i))) / U[i][i]

    return L, U

def forward_substitution(L, b):
    """
    Solves the equation Ly = b for y, where L is a lower triangular matrix.
    """
    n = len(b)
    y = np.zeros_like(b, dtype=float)

    for i in range(n):
        y[i] = (b[i] - np.dot(L[i][:i], y[:i])) / L[i][i]

    return y

def backward_substitution(U, y):
    """
    Solves the equation Ux = y for x, where U is an upper triangular matrix.
    """
    n = len(y)
    x = np.zeros_like(y, dtype=float)

    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - np.dot(U[i][i+1:], x[i+1:])) / U[i][i]

    return x

def solve_doolittle(A, b):
    """
    Solves the linear system Ax = b using Doolittle decomposition.
    """
    # Perform Doolittle decomposition
    L, U = doolittle_decomposition(A)

    # Solve Ly = b for y
    y = forward_substitution(L, b)

    # Solve Ux = y for x
    x = backward_substitution(U, y)

    return x, y, L, U
