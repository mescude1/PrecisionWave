import numpy as np


def gauss_seidel(A, b, x0, tol=1e-7, max_iterations=100):
    n = len(b)
    x = np.array(x0, dtype=float)

    for k in range(max_iterations):
        x_old = x.copy()

        for i in range(n):
            s1 = sum(A[i][j] * x[j] for j in range(i))
            s2 = sum(A[i][k] * x_old[k] for k in range(i + 1, n))
            x[i] = (b[i] - s1 - s2) / A[i][i]

        # Check for convergence
        if np.linalg.norm(x - x_old, ord=np.inf) < tol:
            return x, k, abs(np.linalg.norm(x - x_old, ord=np.inf))

    raise ValueError(f'Gauss-Seidel method did not converge after {max_iterations} iterations')
