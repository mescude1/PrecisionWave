import pandas as pd

from Backend.app.helpers.function_parser import string_function_evaluator


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
        f_x0 = string_function_evaluator(f,x0)
        df_x0 = string_function_evaluator(df,x0)
        ddf_x0 = string_function_evaluator(ddf,x0)

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
            'f_x_i': f_x0,
            'df_x_i': df_x0,
            'ddf_x_i': ddf_x0,
            'x_(i+1)': x1,
            'e': error
        }
        result_array.append(result)

        if error < tol:
            df_result = pd.DataFrame(result_array)
            return x1, i + 1, True, df_result

        # Update x0 for next iteration
        x0 = x1

    raise ValueError("Multiple root method did not converge within the maximum number of iterations.")
