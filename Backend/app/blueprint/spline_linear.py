import numpy as np
import matplotlib.pyplot as plt

def linear_spline(x, y, x_new):
    y_new = []
    for x_val in x_new:
        for i in range(len(x) - 1):
            if x[i] <= x_val <= x[i + 1]:
                # Compute the linear interpolation
                slope = (y[i + 1] - y[i]) / (x[i + 1] - x[i])
                y_val = y[i] + slope * (x_val - x[i])
                y_new.append(y_val)
                break
    return np.array(y_new)

# Example usage
x_points = np.array([0, 1, 2, 3, 4])
y_points = np.array([0, 1, 4, 9, 16])
x_new = np.linspace(0, 4, 100)
y_new = linear_spline(x_points, y_points, x_new)

plt.plot(x_points, y_points, 'o', label='Data points')
plt.plot(x_new, y_new, '-', label='Linear Spline')
plt.legend()
plt.show()