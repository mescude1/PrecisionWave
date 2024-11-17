from flask import (
    abort, Blueprint, request, Response, make_response, jsonify
)

from ..pw_library.python_methods.bisection import bisection_method

bp = Blueprint('bisection', __name__, url_prefix='/methods')


@bp.route('/bisection', methods=['GET'])
def bisection_get() -> Response:

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
    if not request.is_json:
        abort(400)

    f = request.json.get('f')
    a = float(request.json.get('a'))
    b = float(request.json.get('b'))



    root, iterations, converged, df_result = bisection_method(f, a, b)

    result = {
        'root': root,
        'iterations': iterations,
        'converged': converged,
        'df_result': df_result.to_json(orient='records')
    }

    return make_response(jsonify({'status': 'success','data': result}), 200)

