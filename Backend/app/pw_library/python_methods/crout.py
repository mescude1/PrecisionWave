import numpy as np

def crout_decomposition(A):
    """
    Performs Crout decomposition on matrix A.
    Returns matrices L and U such that A = L * U.
    """
    n = A.shape[0]
    L = np.zeros((n, n), dtype=float)
    U = np.eye(n, dtype=float)  # U is an identity matrix

    for j in range(n):
        for i in range(j, n):
            # Compute L[i][j]
            L[i, j] = A[i, j] - sum(L[i, k] * U[k, j] for k in range(j))

        for i in range(j + 1, n):
            # Compute U[j][i]
            if L[j, j] == 0:
                raise ValueError("Matrix is singular; zero pivot encountered.")
            U[j, i] = (A[j, i] - sum(L[j, k] * U[k, i] for k in range(j))) / L[j, j]

    return L, U

def forward_substitution(L, b):
    """
    Solves the equation Ly = b for y, where L is a lower triangular matrix.
    """
    n = len(b)
    y = np.zeros_like(b, dtype=float)

    for i in range(n):
        y[i] = (b[i] - np.dot(L[i, :i], y[:i])) / L[i, i]

    return y

def backward_substitution(U, y):
    """
    Solves the equation Ux = y for x, where U is an upper triangular matrix.
    """
    n = len(y)
    x = np.zeros_like(y, dtype=float)

    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - np.dot(U[i, i+1:], x[i+1:])) / U[i, i]

    return x

def solve_crout(A, b):
    """
    Solves the linear system Ax = b using Crout decomposition.
    """
    # Perform Crout decomposition
    L, U = crout_decomposition(A)

    # Solve Ly = b for y
    y = forward_substitution(L, b)

    # Solve Ux = y for x
    x = backward_substitution(U, y)

    return x, y, L, U
