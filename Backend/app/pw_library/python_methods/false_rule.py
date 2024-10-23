import math
import pandas as pd


def false_rule(f, a, b, tol, Nmax):
    """
    This program finds the solution to the equation f(x) = 0 en el interval [a, b] using the method of the false rule

    Inputs:
    f: continious function
    a: left endpoint of the initial interval
    b: right endpoint of the initial interval
    tol: tolerance
    Nmax: maximum number of iterations

    Outputs:
    x: aproximate solution
    iter: number of iterations
    err: estimated error
    """
    # Initialization
    fa = f(a)
    fb = f(b)
    pm = (fb * a - fa * b) / (fb - fa)
    fpm = f(pm)
    E = 1000  # Initial large error
    cont = 1  # Iteration counted
    
    # loop of the false rule method
    result_array = []
    while E > tol and cont < Nmax:
        if fa * fpm < 0:
            b = pm
            fb = fpm
        else:
            a = pm
            fa = fpm


        # Updating previous point
        p0 = pm
        pm = (fb * a - fa * b) / (fb - fa)
        fpm = f(pm)
        E = abs(pm - p0)

        result = {
            'i': cont,
            'x_i': pm,
            'f_xi': fpm,
            'e': abs(pm - p0)
        }
        result_array.append(result)

        cont += 1
    
    # Results
    x = pm
    iter = cont
    err = E
    return x, iter, err, result_array