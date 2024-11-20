from flask import Blueprint, make_response, jsonify, request
from app.pw_library.python_methods.gauss_seidel import gauss_seidel

bp = Blueprint('gauss_seidel', __name__, url_prefix='/methods')


@bp.route('/gauss-seidel', methods=['GET'])
def gauss_seidel_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            The Gauss-Seidel Method is an iterative technique for solving a system of 
                                            linear equations of the form 𝐴𝑥=𝑏, where 𝐴 is a matrix of coefficients, 𝑥 is 
                                            the vector of variables, and 𝑏 is the constants vector. This method is 
                                            especially useful for large, sparse systems where direct methods like Gaussian 
                                            elimination would be computationally expensive.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - A: coefficient matrix (nxn).
                                                - b: right-hand side vector (nx1).
                                                - x0: first inference
                                            OUTPUT:
                                                - x: solution vector to the system of equations Ax = b.
                                        '''}), 200)


@bp.route('/gauss-seidel', methods=['POST'])
def gauss_seidel_post() -> str:
    a = [[float(element) for element in row] for row in request.get_json('matrix').get('matrix')]
    b = [float(element) for element in request.get_json('vector').get('vector')]
    x0 = [float(element) for element in request.get_json('inference').get('inference')]

    x, steps = gauss_seidel(a, b, x0)

    result = {
        'x': x.tolist(),
        'steps': steps
    }
    return make_response(jsonify({'status': "success", 'data': result}), 200)

