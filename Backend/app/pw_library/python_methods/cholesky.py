import numpy as np


def cholesky_factorization(A):
    """
    Perform Cholesky factorization on matrix A, allowing for complex numbers.

    Parameters:
        A (numpy.ndarray): A Hermitian positive-definite matrix (n x n).

    Returns:
        L (numpy.ndarray): Lower triangular matrix, where A = L @ L.H
    """
    n = A.shape[0]
    L = np.zeros_like(A, dtype=np.complex128)

    for i in range(n):
        for j in range(i + 1):
            sum_val = sum(L[i, k] * L[j, k].conjugate() for k in range(j))

            if i == j:  # Diagonal elements
                L[i, j] = np.sqrt(A[i, i] - sum_val)
            else:
                L[i, j] = (A[i, j] - sum_val) / L[j, j]

    return L
