import numpy as np


def gaussian_elimination_no_pivot_verbose(matrix, vector):
    # Ensure A and b are numpy arrays
    matrix = np.array(matrix, dtype=float)
    vector = np.array(vector, dtype=float)

    n = len(vector)

    # Create an augmented matrix [A|b]
    augmented_matrix = np.hstack((matrix, vector.reshape(-1, 1)))

    print("Initial augmented matrix:")
    print(augmented_matrix)
    print("=" * 50)

    # Forward elimination
    for i in range(n):
        # Check for zero pivot element
        if augmented_matrix[i, i] == 0:
            raise ValueError(f"Zero pivot encountered at row {i}. The matrix may be singular.")

        for j in range(i + 1, n):
            factor = augmented_matrix[j, i] / augmented_matrix[i, i]
            augmented_matrix[j] -= factor * augmented_matrix[i]

        # Output the augmented matrix after each step
        print(f"Augmented matrix after eliminating row {i}:")
        print(augmented_matrix)
        print("=" * 50)

    # Back substitution
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        sum_ax = np.dot(augmented_matrix[i, :-1], x)
        x[i] = (augmented_matrix[i, -1] - sum_ax) / augmented_matrix[i, i]

    # Output the final solution vector
    print("Solution vector x:")
    print(x)
    print("=" * 50)

    return x