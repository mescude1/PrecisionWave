def cubic_spline_coefficients(x_vals, y_vals):
    """
    Calculate cubic spline coefficients for a set of points using natural boundary conditions.

    Parameters:
        x_vals (list or array): x-coordinates of the data points.
        y_vals (list or array): y-coordinates of the data points.

    Returns:
        list of tuples: Each tuple contains the coefficients (a, b, c, d) for the cubic polynomial
                        on each interval.
    """
    n = len(x_vals) - 1
    h = [x_vals[i + 1] - x_vals[i] for i in range(n)]
    coefficients = []

    # Setup the system of equations for cubic spline
    # Second derivatives at the endpoints are zero (natural spline)
    A = np.zeros((n + 1, n + 1))
    b = np.zeros(n + 1)

    A[0, 0] = 1
    A[n, n] = 1

    for i in range(1, n):
        A[i, i - 1] = h[i - 1]
        A[i, i] = 2 * (h[i - 1] + h[i])
        A[i, i + 1] = h[i]
        b[i] = (3 / h[i]) * (y_vals[i + 1] - y_vals[i]) - (3 / h[i - 1]) * (y_vals[i] - y_vals[i - 1])

    # Solve for the second derivatives
    c = np.linalg.solve(A, b)

    for i in range(n):
        a = y_vals[i]
        b = (y_vals[i + 1] - y_vals[i]) / h[i] - (2 * c[i] + c[i + 1]) * h[i] / 3
        d = (c[i + 1] - c[i]) / (3 * h[i])
        coefficients.append((a, b, c[i], d))

    return coefficients
