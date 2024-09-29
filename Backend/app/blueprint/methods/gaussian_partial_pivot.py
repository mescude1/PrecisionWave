import numpy as np


def gaussian_elimination_with_partial_pivoting(A, b):
    """
    Solves the system of linear equations Ax = b using Gaussian Elimination with Partial Pivoting.

    Parameters:
    A (list of lists or np.ndarray): Coefficient matrix.
    b (list or np.ndarray): Right-hand side vector.

    Returns:
    np.ndarray: Solution vector x.
    """
    # Convert A and b to numpy arrays
    A = np.array(A, float)
    b = np.array(b, float)
    n = len(b)

    # Augment A with b to form the augmented matrix
    augmented_matrix = np.hstack([A, b.reshape(-1, 1)])

    # Perform Gaussian elimination with partial pivoting
    for i in range(n):
        # Partial Pivoting: Find the row with the largest value in the current column
        max_row = np.argmax(abs(augmented_matrix[i:, i])) + i
        if augmented_matrix[max_row, i] == 0:
            raise ValueError("Matrix is singular or nearly singular")

        # Swap the current row with the row having the largest pivot element
        if max_row != i:
            augmented_matrix[[i, max_row]] = augmented_matrix[[max_row, i]]

        # Eliminate values below the pivot
        for j in range(i + 1, n):
            factor = augmented_matrix[j, i] / augmented_matrix[i, i]
            augmented_matrix[j, i:] -= factor * augmented_matrix[i, i:]

    # Back substitution to solve for x
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (augmented_matrix[i, -1] - np.dot(augmented_matrix[i, i + 1:n], x[i + 1:])) / augmented_matrix[i, i]

    return x


# Example usage:
A = [[2, -1, 1],
     [3, 3, 9],
     [3, 3, 5]]

b = [8, -6, -4]

solution = gaussian_elimination_with_partial_pivoting(A, b)
print("Solution:", solution)
