import pandas as pd

from app.helpers.function_parser import string_function_evaluator


def incremental_search(function, x0, h, n_max=100):
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
    fant = string_function_evaluator(function, xant)
    xact = xant + h
    fact = string_function_evaluator(function, xact)
    result_array = []
    # Loop
    i = 0
    for i in range(1, n_max + 1):
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
        fact = string_function_evaluator(function, xact)

    # Result delivery

    result_df = pd.DataFrame(result_array)
    return xant, xact, i, result_df
