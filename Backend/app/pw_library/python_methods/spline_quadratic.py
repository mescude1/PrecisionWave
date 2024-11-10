import numpy as np


def quadratic_spline_coefficients(x, y, x_new):
    n = len(x) - 1
    h = np.diff(x)
    a = y[:-1]
    b = np.zeros(n)
    c = np.zeros(n)

    # Solving for coefficients using the natural boundary condition
    for i in range(1, n):
        c[i] = (y[i+1] - y[i]) / h[i] - (y[i] - y[i-1]) / h[i-1]
    c /= 2

    # Calculate b coefficients
    for i in range(n):
        b[i] = (y[i+1] - y[i]) / h[i] - h[i] * c[i]

    # Interpolation
    y_new = []
    for x_val in x_new:
        for i in range(n):
            if x[i] <= x_val <= x[i+1]:
                dx = x_val - x[i]
                y_val = a[i] + b[i] * dx + c[i] * dx ** 2
                y_new.append(y_val)
                break
    return np.array(y_new)

# Example usage
y_new = quadratic_spline(x_points, y_points, x_new)

plt.plot(x_points, y_points, 'o', label='Data points')
plt.plot(x_new, y_new, '-', label='Quadratic Spline')
plt.legend()
plt.show()
