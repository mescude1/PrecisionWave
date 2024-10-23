""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""

from flask import (
    current_app, abort, Blueprint, request, Response, make_response, jsonify
)

from ..pw_library.python_methods.bisection import bisection_method

bp = Blueprint('bisection', __name__, url_prefix='/methods')


@bp.route('/bisection', methods=['GET'])
def bisection_get() -> Response:
    """This function is responsible to deal with requests
    coming from index URL. It returns a simple text indicating
    the server is running.

    Returns:
        Response: a dictionary with the tooltips and method help
    """


    response = make_response(jsonify({
        'message': 'Bisection method',
        'description': '''The bisection method is based on the Intermediate Value Theorem, which states that if a continuous function changes
                          sign over an interval, there is at least one root in that interval. The method systematically reduces the interval
                          in which the root lies by repeatedly bisecting it.''',
        'instructions': '''Bisection method to find the root of f(x) in the interval [a, b].
                           Parameters:
                            f : function
                                The function for which we are trying to find a root.
                            a, b : float
                                The interval [a, b] in which the root is located.
                            tolerance : float, optional
                                The stopping criterion for the algorithm.
                            max_iterations : int, optional
                                The maximum number of iterations to perform.'''
    }))
    return response


@bp.route('/bisection', methods=['POST'])
def bisection_post() -> Response:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """
    if not request.is_json:
        abort(400)

    f = request.json.get('function')
    a = request.json.get('a')
    b = request.json.get('b')

    result = bisection_method(f, a, b)

    return result

