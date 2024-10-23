import numpy as np


def gaussian_elimination_with_partial_pivoting_verbose(matrix, vector):
    """
    Solves the system of linear equations Ax = b using Gaussian Elimination with Partial Pivoting.
    Outputs intermediate augmented matrices at each step.

    Parameters:
    A (list of lists or np.ndarray): Coefficient matrix.
    b (list or np.ndarray): Right-hand side vector.

    Returns:
    np.ndarray: Solution vector x.
    """
    # Convert A and b to numpy arrays
    matrix = np.array(matrix, float)
    vector = np.array(vector, float)
    n = len(vector)

    # Augment A with b to form the augmented matrix
    augmented_matrix = np.hstack([matrix, vector.reshape(-1, 1)])

    print("Initial augmented matrix:")
    print(augmented_matrix)
    print("=" * 50)

    # Perform Gaussian elimination with partial pivoting
    for i in range(n):
        # Partial Pivoting: Find the row with the largest value in the current column
        max_row = np.argmax(abs(augmented_matrix[i:, i])) + i
        if augmented_matrix[max_row, i] == 0:
            raise ValueError("Matrix is singular or nearly singular")

        # Swap the current row with the row having the largest pivot element
        if max_row != i:
            augmented_matrix[[i, max_row]] = augmented_matrix[[max_row, i]]

        # Print the augmented matrix after row swapping
        print(f"Augmented matrix after swapping row {i} with row {max_row}:")
        print(augmented_matrix)
        print("=" * 50)

        # Eliminate values below the pivot
        for j in range(i + 1, n):
            factor = augmented_matrix[j, i] / augmented_matrix[i, i]
            augmented_matrix[j, i:] -= factor * augmented_matrix[i, i:]

        # Print the augmented matrix after eliminating row j
        print(f"Augmented matrix after eliminating row {j}:")
        print(augmented_matrix)
        print("=" * 50)

    # Back substitution to solve for x
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (augmented_matrix[i, -1] - np.dot(augmented_matrix[i, i + 1:n], x[i + 1:])) / augmented_matrix[i, i]

    # Print the final solution vector x
    print("Solution vector x:")
    print(x)
    print("=" * 50)

    return x
