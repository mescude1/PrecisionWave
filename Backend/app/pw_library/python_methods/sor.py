import numpy as np


def sor(A, b, x0, w, tol=1e-10, max_iterations=1000):
    n = len(b)
    x = x0.copy()

    for k in range(max_iterations):
        x_old = x.copy()

        for i in range(n):
            s1 = sum(A[i][j] * x[j] for j in range(i))
            s2 = sum(A[i][j] * x_old[j] for j in range(i + 1, n))
            x[i] = (1 - w) * x_old[i] + w * (b[i] - s1 - s2) / A[i][i]

        # Check for convergence
        if np.linalg.norm(x - x_old, ord=np.inf) < tol:
            return x, k

    raise ValueError(f'SOR method did not converge after {max_iterations} iterations')