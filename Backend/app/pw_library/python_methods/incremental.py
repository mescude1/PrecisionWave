import math
import pandas as pd


def incremental_search(function, x0, h, nmax):
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
    fant = function(xant)
    xact = xant + h
    fact = function(xact)
    result_array = []
    # Loop
    i = 0
    for i in range(1, nmax+1):
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

    result_data_frame = pd.DataFrame(result_array)
    return xant, xact, i, result_data_frame
