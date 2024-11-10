import numpy as np


def cholesky_decomposition(A):
    """
    Performs Cholesky decomposition on a Hermitian, positive-definite matrix A.
    Returns the lower triangular matrix L such that A = L * L.H (L conjugate transpose).
    """
    n = A.shape[0]
    L = np.zeros_like(A, dtype=np.complex128)
    # make the matrix a complex number matrix to account for complex numbers appearing as a result of a
    # square root applied to a negative integer

    for i in range(n):
        for j in range(i + 1):
            sum_val = sum(L[i][k] * L[j][k].conjugate() for k in range(j))

            if i == j:  # Diagonal elements
                L[i, j] = np.sqrt(A[i, i] - sum_val)
            else:
                L[i, j] = (A[i][j] - sum_val) / L[j][j]

    return L


def forward_substitution(L, b):
    """
    Solves the equation Ly = b for y, where L is a lower triangular matrix.
    """
    n = len(b)
    y = np.zeros_like(b, dtype=np.complex128)

    # make the vector a complex number vector to account for complex numbers resulting from operations on complex numbers
    # from A

    for i in range(n):
        y[i] = (b[i] - np.dot(L[i][:i], y[:i])) / L[i][i]

    return y


def backward_substitution(L, y):
    """
    Solves the equation L.H x = y for x, where L is a lower triangular matrix and L.H is its conjugate transpose.
    """
    n = len(y)
    x = np.zeros_like(y, dtype=np.complex128)

    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - np.dot(L[i + 1:][i].conjugate(), x[i + 1:])) / L[i][i].conjugate()

    return x


def solve_cholesky(A, b):
    """
    Solves the linear system Ax = b using Cholesky decomposition, accounting for complex numbers.
    """
    # Perform Cholesky decomposition
    L = cholesky_decomposition(A)

    # Solve Ly = b for y
    y = forward_substitution(L, b)

    # Solve L.H x = y for x
    x = backward_substitution(L, y)

    return x, y, L
