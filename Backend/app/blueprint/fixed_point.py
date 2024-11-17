from flask import Blueprint, make_response, jsonify, request, abort
from app.pw_library.python_methods.fixed_point import fixed_point_method

bp = Blueprint('fixed_point', __name__, url_prefix='/methods')


@bp.route('/fixed-point', methods=['GET'])
def fixed_point_get() -> str:

    response = make_response(jsonify({
        'message': 'Fixed point method.',
        'description': '''The fixed-point method is an iterative numerical technique used to solve equa- tions of the 
                          form x=g(x)x = g(x)x=g(x). In this method, the goal is to find a value xxx such that 
                          g(x)=xg(x) = xg(x)=x, which is known as a fixed point of the function g(x)g(x)g(x).''',
        'instructions': '''Fixed-Point Iteration Method to solve f(x) = 0 using x = g(x).
                            Parameters:
                            f : function
                                The original function f(x) for which we are trying to find the root.
                            g : function
                                The transformation function g(x) used for the fixed-point iteration (x = g(x)).
                            x0 : float
                                Initial guess for the root.
                            tol : float, optional
                                Tolerance for convergence. Default is 1e-7.
                            max_iter : int, optional
                                Maximum number of iterations. Default is 1000.
                        
                            Returns:
                            x : float
                                The approximate root of f(x) = 0.
                            iterations : int
                                The number of iterations performed.
                            converged : bool
                                Whether the method converged to a solution.
                            result_df : pd.DataFrame
                                A DataFrame containing details of each iteration.
                            '''
    }))

    return response


@bp.route('/fixed-point', methods=['POST'])
def fixed_point_post() -> str:
    if not request.is_json:
        abort(400)

    f = request.json.get('f')
    g = request.json.get('g')
    x0 = float(request.json.get('x0'))

    x_new, iterations, converged, result_df = fixed_point_method(f, g, x0)

    result = {
        'root': x_new,
        'iterations': iterations,
        'converged': converged,
        'result_df': result_df.to_json(orient='records')
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

