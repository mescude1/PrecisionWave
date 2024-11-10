import numpy as np


def lu_factorization_with_pivoting(A):
    """
    Performs LU factorization with partial pivoting on matrix A.
    Returns matrices P, L, U such that PA = LU.
    """
    n = len(A)
    L = np.eye(n)
    U = A.copy()
    P = np.eye(n)

    for i in range(n):
        # Find the pivot row
        pivot_row = np.argmax(np.abs(U[i:, i])) + i

        # Swap rows in U and update P and L accordingly
        if pivot_row != i:
            U[[i, pivot_row]] = U[[pivot_row, i]]
            P[[i, pivot_row]] = P[[pivot_row, i]]
            if i > 0:
                L[[i, pivot_row], :i] = L[[pivot_row, i], :i]

        # Eliminate entries below the pivot
        for j in range(i + 1, n):
            if U[i, i] == 0:
                raise ValueError("Zero pivot encountered, matrix may be singular.")

            # Calculate the multiplier and update L
            L[j, i] = U[j, i] / U[i, i]

            # Perform elimination
            U[j, i:] = U[j, i:] - L[j, i] * U[i, i:]

    return P, L, U


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


def solve_lu_with_pivoting(A, b):
    """
    Solves the linear system Ax = b using LU factorization with partial pivoting.
    """
    # Perform LU factorization with pivoting
    P, L, U = lu_factorization_with_pivoting(A)

    # Adjust b according to the permutation matrix P
    Pb = np.dot(P, b)

    # Solve Ly = Pb for y
    y = forward_substitution(L, Pb)

    # Solve Ux = y for x
    x = backward_substitution(U, y)

    return x, P, L, U
