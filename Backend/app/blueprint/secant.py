from flask import Blueprint, make_response, request, abort, jsonify
from app.pw_library.python_methods.seccant import secant_method

bp = Blueprint('secant', __name__, url_prefix='/methods')


@bp.route('/secant', methods=['GET'])
def secant_get() -> str:

    return make_response({'status': 200,
                          'data': {'description': '''The secant method is an iterative numerical technique used to find 
                                                     roots of a real-valued function, 𝑓(𝑥)=0. It's similar to the 
                                                     Newton-Raphson method, but it doesn’t require calculating derivatives, 
                                                     making it useful for functions where derivatives are hard to compute.''',
                                   'instructions': '''Parameters:
                                                        f : function
                                                            The function for which we are trying to find a root.
                                                        x0 : float
                                                            Initial guess 1.
                                                        x1 : float
                                                            Initial guess 2.
                                                        tol : float, optional
                                                            Tolerance for stopping the iteration. Default is 1e-6.
                                                        max_iter : int, optional
                                                            Maximum number of iterations. Default is 100.
                                                    
                                                        Returns:
                                                        float
                                                            The root of the function f.'''
                                   }
                          }
                         )


@bp.route('/secant', methods=['POST'])
def secant_post() -> str:
    if not request.is_json:
        abort(400)

    f = request.json.get('f')
    x0 = request.json.get('x0')
    x1 = request.json.get('x1')

    root, iterations, converged, result_df = secant_method(f, x0, x1)

    result = {
        'root': root,
        'iterations': iterations,
        'converged': converged,
        'result_df': result_df.to_json(orient='records')
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

