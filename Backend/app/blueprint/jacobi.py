from flask import Blueprint, make_response, jsonify, request
from app.pw_library.python_methods.jacobi import jacobi

bp = Blueprint('jacobi', __name__, url_prefix='/methods')


@bp.route('/jacobi', methods=['GET'])
def jacobi_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            The Jacobi Method is an iterative algorithm used to solve a system of linear 
                                            equations, specifically of the form 𝐴𝑥=𝑏, where 𝐴 is a matrix of coefficients, 
                                            𝑥 is the vector of variables, and 𝑏 is the constants vector. This method is 
                                            particularly beneficial for large systems of equations where direct methods 
                                            (like Gaussian elimination) are inefficient or computationally expensive.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - A: coefficient matrix (nxn).
                                                - b: right-hand side vector (nx1).
                                                - x0: first inference
                                            OUTPUT:
                                                - x: solution vector to the system of equations Ax = b.
                                        '''}), 200)


@bp.route('/jacobi', methods=['POST'])
def jacobi_post() -> str:
    a = request.get_json('A')
    b = request.get_json('b')
    x0 = request.get_json('x0')

    x, steps = jacobi(a, b, x0)

    result = {
        'x': x,
        'steps': steps
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

