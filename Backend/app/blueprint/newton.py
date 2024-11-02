from flask import Blueprint, make_response, jsonify, request, abort

from Backend.app.helpers.function_parser import string_function_differentiator
from Backend.app.pw_library.python_methods.newton import newton_raphson

bp = Blueprint('newton', __name__, url_prefix='/methods')


@bp.route('/newton', methods=['GET'])
def newton_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            The Newton-Raphson Method is an iterative numerical technique for finding roots (or zeroes) of a real-valued 
                                            function f(x)f(x)f(x). It is one of the most widely used methods for solving nonlinear equations due to its 
                                            simplicity and fast convergence near a root. The method is particularly effective for functions that are 
                                            continuously differentiable and where the initial guess is relatively close to the true root.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                            - f: function whose zero (root) is to be found.
                                            - df: derivative of the function f.
                                            - x0: initial guess for the root.
                                            - tol: tolerance for convergence (default value is 1e-7).
                                            - max_iter: maximum number of iterations allowed (default value is 30).
                                        
                                            OUTPUT:
                                            - x: approximate root of the function f.
                                            - n: number of iterations performed.
                                            - result_array: table with details of each iteration.
                                        '''}), 200)


@bp.route('/newton', methods=['POST'])
def newton_post() -> str:
    if not request.is_json:
        abort(400)

    f = request.json.get('f')
    df = string_function_differentiator(f)
    x0 = request.json.get('x0')

    root, iterations, converged, df_result = newton_raphson(f, df, x0)

    result = {
        'root': root,
        'iterations': iterations,
        'converged': converged,
        'df_result': df_result
    }

    return make_response(jsonify({'status': "success",
                                        'data': result}), 200)

