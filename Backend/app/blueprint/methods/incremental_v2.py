import math

import numpy as np
import pandas as pd

def incremental_search(f, x0, h, Nmax):
    """
    This program finds an interval where f(x) has a sign change using the incremental search method.
    Inputs:
    f: continuous function
    x0: initial point
    h: step
    Nmax: maximum number of iterations

    Outputs:
    a: left endpoint of the interval
    b: right endpoint of the interval
    iter: number of iterations
    """

    # Initialization

    xant = x0
    fant = f(xant)
    xact = xant + h
    fact = f(xact)
    result_array = []
    # Loop
    for i in range(1, Nmax+1):
        if fant * fact < 0:
            result = {
                'i': i,
                'x_i': xact,
                'f_xi': fact,
                'e': abs(xact - xant)
            }
            result_array.append(result)
            break
        result = {
            'i': i,
            'x_i': xact,
            'f_xi': fact,
            'e': abs(xact - xant)
        }
        result_array.append(result)
        xant = xact
        fant = fact
        xact = xant + h
        fact = f(xact)

    # Result delivery

    a = xant
    b = xact
    iter = i
    result_data_frame = pd.DataFrame(result_array)
    return a, b, iter, result_data_frame

# Ejemplo de uso:
if __name__ == "__main__":
    # Define a continuous function f(x)
    def f(x):
        return math.log((math.sin(x)**2) + 1 ) - 1/2  # change this to any function desired

    # Initial parameters
    x0 = -3  # Starting point
    h = 0.5  # Step
    Nmax = 100  # Maximum number of iterations

    # function invocation

    a, b, i, result_data_frame = incremental_search(f, x0, h, Nmax)
    print(f"Interval: [{a}, {b}], Iterations: {i}")
    print(f"Result data frame:\n{result_data_frame}")