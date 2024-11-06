def linear_spline_coefficients(x_vals, y_vals):
    """
    Calculate linear spline coefficients for a set of points.

    Parameters:
        x_vals (list or array): x-coordinates of the data points.
        y_vals (list or array): y-coordinates of the data points.

    Returns:
        list of tuples: Each tuple contains the slope (m) and intercept (b) for an interval.
    """
    n = len(x_vals) - 1
    coefficients = []

    for i in range(n):
        # Calculate the slope and intercept for the interval [x_i, x_{i+1}]
        m = (y_vals[i + 1] - y_vals[i]) / (x_vals[i + 1] - x_vals[i])
        b = y_vals[i] - m * x_vals[i]
        coefficients.append((m, b))

    return coefficients
