import numpy as np


def crout_factorization(A):
    """
    Perform Crout LU factorization on matrix A.

    Parameters:
        A (numpy.ndarray): A square matrix (n x n).

    Returns:
        L (numpy.ndarray): Lower triangular matrix with main diagonal.
        U (numpy.ndarray): Upper triangular matrix with unit diagonal.
    """
    n = A.shape[0]
    L = np.zeros_like(A, dtype=np.double)
    U = np.identity(n, dtype=np.double)  # U has 1s on its diagonal

    for i in range(n):
        # Calculate L[i, j]
        for j in range(i, n):
            L[j, i] = A[j, i] - sum(L[j, k] * U[k, i] for k in range(i))

        # Calculate U[i, j]
        for j in range(i + 1, n):
            if L[i, i] == 0:
                raise ValueError("Matrix is singular and cannot be decomposed")
            U[i, j] = (A[i, j] - sum(L[i, k] * U[k, j] for k in range(i))) / L[i, i]

    return L, U
