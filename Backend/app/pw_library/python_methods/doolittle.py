import numpy as np

def doolittle_solve(A, b):
    """
    Solve the equation Ax = b using Doolittle factorization.

    Parameters:
        A (numpy.ndarray): Coefficient matrix (n x n).
        b (numpy.ndarray): Right-hand side vector (n x 1).

    Returns:
        x (numpy.ndarray): Solution vector.
    """
    # Step 1: Perform LU decomposition
    n = A.shape[0]
    L = np.zeros_like(A, dtype=np.double)
    U = np.zeros_like(A, dtype=np.double)

    # Initialize L with identity matrix
    for i in range(n):
        L[i, i] = 1

    for i in range(n):
        # Calculate U[i, j]
        for j in range(i, n):
            U[i, j] = A[i, j] - sum(L[i, k] * U[k, j] for k in range(i))

        # Calculate L[j, i]
        for j in range(i + 1, n):
            if U[i, i] == 0:
                raise ValueError("Matrix is singular and cannot be decomposed")
            L[j, i] = (A[j, i] - sum(L[j, k] * U[k, i] for k in range(i))) / U[i, i]

    # Step 2: Solve Ly = b (forward substitution)
    y = np.zeros_like(b, dtype=np.double)
    for i in range(n):
        y[i] = b[i] - sum(L[i, j] * y[j] for j in range(i))

    # Step 3: Solve Ux = y (backward substitution)
    x = np.zeros_like(b, dtype=np.double)
    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - sum(U[i, j] * x[j] for j in range(i + 1, n))) / U[i, i]

    return x
