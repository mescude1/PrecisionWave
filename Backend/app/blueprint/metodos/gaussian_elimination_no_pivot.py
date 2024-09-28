import numpy as np


def gaussian_elimination_no_pivoting(A, b):
    """
    Solves the system of linear equations Ax = b using Gaussian Elimination without Pivoting.

    Parameters:
    A (list of lists or np.ndarray): Coefficient matrix.
    b (list or np.ndarray): Right-hand side vector.

    Returns:
    np.ndarray: Solution vector x.
    """
    # Convert A and b into numpy arrays
    A = np.array(A, float)
    b = np.array(b, float)
    n = len(b)

    # Augment A with b to form the augmented matrix
    augmented_matrix = np.hstack([A, b.reshape(-1, 1)])

    # Forward elimination (without pivoting)
    for i in range(n):
        # Check if the diagonal element is zero, which would lead to division by zero
        if augmented_matrix[i, i] == 0:
            raise ValueError(f"Zero pivot encountered at row {i}. No pivoting applied.")

        # Eliminate entries below the pivot
        for j in range(i + 1, n):
            factor = augmented_matrix[j, i] / augmented_matrix[i, i]
            augmented_matrix[j, i:] -= factor * augmented_matrix[i, i:]

    # Back substitution to solve for x
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (augmented_matrix[i, -1] - np.dot(augmented_matrix[i, i + 1:], x[i + 1:])) / augmented_matrix[i, i]

    return x


# Example usage:
A = [[2, -1, 1],
     [3, 3, 9],
     [3, 3, 5]]

b = [8, -6, -4]

solution = gaussian_elimination_no_pivoting(A, b)
print("Solution:", solution)
