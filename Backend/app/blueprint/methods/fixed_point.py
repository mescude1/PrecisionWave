import pandas as pd


def fixed_point_method(g, x0, tol=1e-7, max_iter=1000):
    """
    Fixed-Point Iteration Method to find a solution to x = g(x).

    Parameters:
    g : function
        The function to apply in the fixed-point iteration (x = g(x)).
    x0 : float
        Initial guess for the fixed-point.
    tol : float, optional
        Tolerance for convergence. Default is 1e-7.
    max_iter : int, optional
        Maximum number of iterations. Default is 1000.

    Returns:
    x : float
        The approximate fixed point.
    iterations : int
        The number of iterations performed.
    converged : bool
        Whether the method converged.
    result_array : list of dict
        A list containing the iteration details.
    """
    result_array = []
    x = x0

    for i in range(max_iter):
        x_new = g(x)
        error = abs(x_new - x)

        result = {
            'i': i + 1,
            'x': x_new,
            'g_x': g(x_new),
            'error': error
        }
        result_array.append(result)

        if error < tol:
            return x_new, i + 1, True, result_array  # Converged

        x = x_new  # Update for the next iteration

    return x, max_iter, False, pd.DataFrame(result_array)  # Did not converge within max_iter


# Example usage:
if __name__ == "__main__":
    import math


    # Define the function g(x) for which we are solving x = g(x)
    def g(x):
        return math.cos(x)  # Example: g(x) = cos(x)


    # Initial guess
    x0 = 0.5

    # Call the fixed-point method
    solution, iterations, converged, results = fixed_point_method(g, x0)

    # Display the results
    if converged:
        print(f"Converged to solution: {solution} in {iterations} iterations.")
    else:
        print(f"Did not converge within {iterations} iterations.")

    # Print iteration details
    for res in results:
        print(f"Iteration {res['i']}: x = {res['x']}, g(x) = {res['g_x']}, error = {res['error']}")
