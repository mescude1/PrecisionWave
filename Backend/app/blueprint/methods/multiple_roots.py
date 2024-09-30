import pandas as pd

def multiple_root_method(f, df, ddf, x0, tol=1e-7, max_iter=100):
    """
    Multiple Root Method to find the root of a function f where the root has multiplicity.

    Parameters:
    f : function
        The function whose root we want to find.
    df : function
        The derivative of the function f.
    ddf : function
        The second derivative of the function f.
    x0 : float
        Initial guess for the root.
    tol : float, optional
        Tolerance for stopping the iteration. Default is 1e-7.
    max_iter : int, optional
        Maximum number of iterations. Default is 100.

    Returns:
    float
        The root of the function f.
    int
        The number of iterations performed.
    pd.DataFrame
        DataFrame with iteration details.
    """
    result_array = []

    for i in range(max_iter):
        f_x0 = f(x0)
        df_x0 = df(x0)
        ddf_x0 = ddf(x0)

        if df_x0**2 - f_x0 * ddf_x0 == 0:
            raise ValueError("Division by zero encountered in the multiple root method.")

        # Multiple Root Method formula
        x1 = x0 - (f_x0 * df_x0) / (df_x0**2 - f_x0 * ddf_x0)

        # Check for convergence
        error = abs(x1 - x0)

        # Store iteration details in result_array
        result = {
            'i': i,
            'x_i': x0,
            'f(x_i)': f_x0,
            'df(x_i)': df_x0,
            'ddf(x_i)': ddf_x0,
            'x_(i+1)': x1,
            'Error': error
        }
        result_array.append(result)

        if error < tol:
            df_result = pd.DataFrame(result_array)
            print(df_result)
            print(f"Converged after {i + 1} iterations.")
            return x1, i + 1, df_result

        # Update x0 for next iteration
        x0 = x1

    raise ValueError("Multiple root method did not converge within the maximum number of iterations.")


# Example usage:
if __name__ == "__main__":
    # Example function f(x) = x^3 - 3x^2 + 3x - 1 (has a root with multiplicity at x = 1)
    f = lambda x: x**3 - 3*x**2 + 3*x - 1
    df = lambda x: 3*x**2 - 6*x + 3  # First derivative of f(x)
    ddf = lambda x: 6*x - 6          # Second derivative of f(x)

    x0 = 0.5  # Initial guess
    tol = 1e-7
    max_iter = 100

    try:
        root, iterations, df_result = multiple_root_method(f, df, ddf, x0, tol, max_iter)
        print(f"Root found: {root}")
        print(f"Number of iterations: {iterations}")
    except ValueError as e:
        print(e)
