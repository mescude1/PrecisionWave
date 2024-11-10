import numpy as np


def jacobi(A, b, x0, tol=1e-10, max_iterations=1000):
    n = len(b)
    x = x0.copy()
    x_new = np.zeros_like(x0)

    for k in range(max_iterations):
        for i in range(n):
            s = sum(A[i, j] * x[j] for j in range(n) if j != i)
            x_new[i] = (b[i] - s) / A[i, i]

        # Check for convergence
        if np.linalg.norm(x_new - x, ord=np.inf) < tol:
            return x_new, k

        x = x_new.copy()

    raise ValueError(f'Jacobi method did not converge after {max_iterations} iterations')

# Example usage:
# A = np.array([[4, 1, 0], [1, 4, 1], [0, 1, 4]], dtype=float)
# b = np.array([7, 15, 10], dtype=float)
# x0 = np.zeros_like(b)
# x_sol, iterations = jacobi(A, b, x0)
# print(f"Solution: {x_sol}, Iterations: {iterations}")


A = np.array([[-1, -1, 4, -3.38], [0, 4, -1, -1], [4, 0, -1, 4.38], [-1, -1, 0, 4]], dtype=float)
print(np.linalg.eigvals(A))

print(jacobi(A, [20, 60, 0 ,40], [0,0,0,0]))