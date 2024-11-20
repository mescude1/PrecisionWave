from flask import Blueprint, make_response, jsonify, request
from app.pw_library.python_methods.sor import sor

bp = Blueprint('sor', __name__, url_prefix='/methods')


@bp.route('/sor', methods=['GET'])
def sor_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            The Successive Over-Relaxation (SOR) Method is an iterative technique used 
                                            to solve systems of linear equations of the form 𝐴𝑥=𝑏. It is a variation of 
                                            the Gauss-Seidel method, enhanced by introducing a relaxation factor 𝜔, which 
                                            accelerates the convergence rate of the solution for specific types of matrices.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - A: coefficient matrix (nxn).
                                                - b: right-hand side vector (nx1).
                                                - x0: first inference
                                            OUTPUT:
                                                - x: solution vector to the system of equations Ax = b.
                                        '''}), 200)


@bp.route('/sor', methods=['POST'])
def sor_post() -> str:
    a = request.get_json('A')
    b = request.get_json('b')
    x0 = request.get_json('x0')
    w = request.get_json('w')

    x, steps = sor(a, b, x0, w)

    result = {
        'x': x.tolist(),
        'steps': steps
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

