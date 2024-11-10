import numpy as np


def lu_factorization(A):
    """
    Performs LU factorization on matrix A without pivoting.
    Returns matrices L and U such that A = L * U.
    """
    n = len(A)
    L = np.eye(n)  # Initialize L as an identity matrix
    U = A.copy()  # U starts as a copy of A

    for i in range(n):
        for j in range(i + 1, n):
            if U[i, i] == 0:
                raise ValueError("Zero pivot encountered; LU factorization without pivoting cannot proceed.")

            # Calculate the multiplier
            L[j, i] = U[j, i] / U[i, i]

            # Eliminate entries below the pivot
            U[j, i:] = U[j, i:] - L[j, i] * U[i, i:]

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
        x[i] = (y[i] - np.dot(U[i, i + 1:], x[i + 1:])) / U[i, i]

    return x


def solve_lu(A, b):
    """
    Solves the linear system Ax = b using LU factorization.
    """
    # Perform LU factorization
    L, U = lu_factorization(A)

    # Solve Ly = b for y
    y = forward_substitution(L, b)

    # Solve Ux = y for x
    x = backward_substitution(U, y)

    return x, L, U
