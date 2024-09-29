import numpy
import numpy as np

A = np.matrix('3 1 2;-4 5 6 ; 0 9 1')
b = np.array([1, 1, 1])

# this equals A\b in matlab

print(numpy.linalg.lstsq(A, b)[0])
