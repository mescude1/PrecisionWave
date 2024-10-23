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

# Example usage:

A = [[10, -3, 0, -1],
     [-3, 15, 2, 5],
     [0, 2, 6, 2],
     [-1, 5, 2, 9]]
b = [1,1,1,1]
x0 = [0,0,0,0]
x_sol, iterations, error= gauss_seidel(A, b, x0)
print(f"Solution: {x_sol}, Iterations: {iterations}, Error, {error}")


# Compute the eigenvalues
eigenvalues, _ = np.linalg.eig(A)

print("The eigenvalues of the matrix are:", eigenvalues)
