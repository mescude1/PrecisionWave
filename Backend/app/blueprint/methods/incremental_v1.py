def incremental_search(f, x_min, x_max, dx):
    """
    Perform an incremental search to find the root of the function f in the interval [x_min, x_max].

    Parameters:
    f (function): The function for which we are searching for a root.
    x_min (float): The start of the interval.
    x_max (float): The end of the interval.
    dx (float): The increment size.

    Returns:
    float or None: The approximate root if found, otherwise None.
    """
    x = x_min
    while x < x_max:
        # Check if there is a sign change between f(x) and f(x + dx)
        if f(x) * f(x + dx) <= 0:
            # Return midpoint of the interval where the sign change occurred
            return x
        x += dx

    return None  # No root found in the interval


def func(x):
    return x


# Perform incremental search on the interval [3, 4] with increment size 0.01
root = incremental_search(func, 3, 4, 0.01)

if root is not None:
    print(f"Root found at: {root}")
else:
    print("No root found in the given interval.")
