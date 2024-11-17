from flask import Blueprint, make_response, jsonify, request, abort
from app.helpers.function_parser import string_function_differentiator
from app.pw_library.python_methods.multiple_roots import multiple_root_method

bp = Blueprint('multiple_roots', __name__, url_prefix='/methods')


@bp.route('/multiple-roots', methods=['GET'])
def multiple_roots_get() -> str:

    return make_response(jsonify({'status': "success",
                                  'description': '''
                                    The Multiple Roots Method (or Method for Multiple Roots) is a numerical technique for 
                                    finding roots of functions when the root is known to have a multiplicity greater 
                                    than one. Standard root-finding methods, like Newton-Raphson, can converge slowly 
                                    or even fail for roots with multiplicity because they assume simple (single) roots. 
                                    The multiple roots method, however, adjusts the iteration formula to handle such 
                                    cases more effectively, improving convergence for these types of roots.
                                  ''',
                                  'instructions': '''
                                        INPUT:
                                        - f: function for which the root is sought.
                                        - df: derivative of the function f.
                                        - ddf: second derivative of the function f.
                                        - x0: initial approximation of the root.
                                        - tol: tolerance for convergence (optional, default value 1e-7).
                                        - max_iter: maximum number of iterations allowed (optional, default value 100).
                                        
                                        OUTPUT:
                                        - x: approximate root of the function f.
                                        - iterations: number of iterations performed.
                                        - data_frame: table with details of each iteration (optional).
                                  '''}))


@bp.route('/multiple-roots', methods=['POST'])
def multiple_roots_post() -> str:
    if not request.is_json:
        abort(400)

    f = request.json.get('f')
    df = string_function_differentiator(f)
    ddf = string_function_differentiator(df)
    x0 = float(request.json.get('x0'))

    root, iterations, converged, df_result = multiple_root_method(f, df, ddf, x0)

    result ={
        'root': root,
        'iterations': iterations,
        'converged': converged,
        'df_result': df_result
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

