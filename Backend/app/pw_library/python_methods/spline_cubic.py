import numpy as np


def cubic_spline_coefficients(x, y, x_new):
    n = len(x) - 1
    h = np.diff(x)
    alpha = [0] * (n + 1)
    l = np.ones(n + 1)
    mu = np.zeros(n)
    z = np.zeros(n + 1)

    # Step 1: Set up the system
    for i in range(1, n):
        alpha[i] = (3 / h[i]) * (y[i + 1] - y[i]) - (3 / h[i - 1]) * (y[i] - y[i - 1])

    # Step 2: Solve the system
    for i in range(1, n):
        l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1]
        mu[i] = h[i] / l[i]
        z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i]

    # Back substitution
    b = np.zeros(n)
    c = np.zeros(n + 1)
    d = np.zeros(n)
    for j in range(n - 1, -1, -1):
        c[j] = z[j] - mu[j] * c[j + 1]
        b[j] = (y[j + 1] - y[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3
        d[j] = (c[j + 1] - c[j]) / (3 * h[j])

    # Interpolation
    y_new = []
    for x_val in x_new:
        for i in range(n):
            if x[i] <= x_val <= x[i + 1]:
                dx = x_val - x[i]
                y_val = y[i] + b[i] * dx + c[i] * dx ** 2 + d[i] * dx ** 3
                y_new.append(y_val)
                break
    return np.array(y_new)
