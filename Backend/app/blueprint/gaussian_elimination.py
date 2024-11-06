from flask import Blueprint, make_response, jsonify, request

from Backend.app.pw_library.python_methods.gaussian_elimination import gaussian_elimination_verbose
from Backend.app.pw_library.python_methods.gaussian_elimination_no_pivot import gaussian_elimination_no_pivot_verbose
from Backend.app.pw_library.python_methods.gaussian_partial_pivot import \
    gaussian_elimination_with_partial_pivoting_verbose

bp = Blueprint('gaussian_elimination', __name__, url_prefix='/methods')


@bp.route('/gaussian-elimination', methods=['GET'])
def gaussian_elimination_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            Gaussian Elimination is a method for solving systems of linear equations by 
                                            transforming the system's augmented matrix into an upper triangular form, 
                                            from which the solutions can be found through back substitution. This 
                                            technique is widely used in linear algebra because it provides a systematic 
                                            approach for solving systems of equations, finding the inverse of a matrix, 
                                            and calculating the rank of a matrix.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - A: coefficient matrix (nxn).
                                                - b: right-hand side vector (nx1).
                                                - pivot:
                                                    - full
                                                    - partial
                                                    - none
                                            OUTPUT:
                                                - x: solution vector to the system of equations Ax = b.
                                        '''}), 200)


@bp.route('/gaussian-elimination', methods=['POST'])
def gaussian_elimination_post() -> str:
    a = request.get_json('A')
    b = request.get_json('b')
    pivot = request.get_json('pivot')
    if  pivot == 'none':
        x, steps = gaussian_elimination_no_pivot_verbose(a, b)
    elif pivot == 'full':
        x, steps = gaussian_elimination_verbose(a, b)
    else:
        x, steps = gaussian_elimination_with_partial_pivoting_verbose(a, b)

    result = {
        'x': x,
        'steps': steps
    }
    return make_response(jsonify({'status': "success", 'data': result}), 200)

