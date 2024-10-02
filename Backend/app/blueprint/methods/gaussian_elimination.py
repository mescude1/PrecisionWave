import numpy as np


def gaussian_elimination_verbose(A, b):
    """
    Solves the system of linear equations Ax = b using Gaussian Elimination.
    Outputs intermediate augmented matrices at each step.

    Parameters:
    A (list of list or np.ndarray): Coefficient matrix.
    b (list or np.ndarray): Right-hand side vector.

    Returns:
    np.ndarray: Solution vector x.
    """
    # Convert A and b into augmented matrix
    A = np.array(A, float)
    b = np.array(b, float)
    n = len(b)

    # Augment A with b
    augmented_matrix = np.hstack([A, b.reshape(-1, 1)])

    print("Initial augmented matrix:")
    print(augmented_matrix)
    print("=" * 50)

    # Forward Elimination: Transform to upper triangular form
    for i in range(n):
        # Partial Pivoting: Swap rows if needed
        max_row = np.argmax(abs(augmented_matrix[i:, i])) + i
        if augmented_matrix[max_row, i] == 0:
            raise ValueError("Matrix is singular or nearly singular")

        # Swap rows
        augmented_matrix[[i, max_row]] = augmented_matrix[[max_row, i]]

        # Print the augmented matrix after row swap
        print(f"Augmented matrix after swapping row {i} with row {max_row}:")
        print(augmented_matrix)
        print("=" * 50)

        # Eliminate the below rows
        for j in range(i + 1, n):
            factor = augmented_matrix[j, i] / augmented_matrix[i, i]
            augmented_matrix[j, i:] -= factor * augmented_matrix[i, i:]

            # Print the augmented matrix after elimination
            print(f"Augmented matrix after eliminating row {j}:")
            print(augmented_matrix)
            print("=" * 50)

    # Back Substitution: Solve the upper triangular system
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (augmented_matrix[i, -1] - np.dot(augmented_matrix[i, i + 1:n], x[i + 1:])) / augmented_matrix[i, i]

    # Print the solution vector x
    print("Solution vector x:")
    print(x)
    print("=" * 50)

    return x


# Example usage:
A = [[2, -1, 0, 3],
     [1, 0.5, 3, 8],
     [0, 13, -2, 11],
     [14, 5, -2, 3]]

b = [1, 1, 1, 1]

solution = gaussian_elimination_verbose(A, b)
print("Solution:", solution)
