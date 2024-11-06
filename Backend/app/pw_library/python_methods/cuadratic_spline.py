def quadratic_spline_coefficients(x_vals, y_vals):
    """
    Calculate quadratic spline coefficients for a set of points.

    Parameters:
        x_vals (list or array): x-coordinates of the data points.
        y_vals (list or array): y-coordinates of the data points.

    Returns:
        list of tuples: Each tuple contains the coefficients (a, b, c) for the quadratic polynomial
                        on each interval.
    """
    n = len(x_vals) - 1
    coefficients = []

    # We'll assume no constraints on second derivatives at endpoints for simplicity.
    for i in range(n):
        # Setup the system for each interval [x_i, x_{i+1}]
        # Quadratic polynomial: f(x) = a*(x - x_i)^2 + b*(x - x_i) + c
        x0, x1 = x_vals[i], x_vals[i + 1]
        y0, y1 = y_vals[i], y_vals[i + 1]

        # The conditions are:
        # 1. f(x_i) = y_i
        # 2. f(x_{i+1}) = y_{i+1}
        # 3. Continuity of the first derivative
        if i < n - 1:
            x2 = x_vals[i + 2]
            y2 = y_vals[i + 2]

            # Solve the system
            A = np.array([
                [(x0 - x0) ** 2, x0 - x0, 1],
                [(x1 - x0) ** 2, x1 - x0, 1],
                [2 * (x1 - x0), 1, 0]
            ])
            b = np.array([y0, y1, (y2 - y1) / (x2 - x1)])
        else:
            # Use only two points for the last interval
            A = np.array([
                [(x0 - x0) ** 2, x0 - x0, 1],
                [(x1 - x0) ** 2, x1 - x0, 1]
            ])
            b = np.array([y0, y1])

        # Solve for a, b, c in the quadratic polynomial
        a, b, c = np.linalg.solve(A, b)
        coefficients.append((a, b, c))

    return coefficients
