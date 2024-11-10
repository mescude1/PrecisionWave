from flask import Blueprint, make_response, jsonify, request

from Backend.app.pw_library.python_methods.gaussian_elimination import gaussian_elimination_verbose
from Backend.app.pw_library.python_methods.gaussian_elimination_no_pivot import gaussian_elimination_no_pivot_verbose
from Backend.app.pw_library.python_methods.gaussian_partial_pivot import \
    gaussian_elimination_with_partial_pivoting_verbose
from Backend.app.pw_library.python_methods.lu_factorization_simple_elimination import solve_lu
from Backend.app.pw_library.python_methods.lu_factorization_with_pivoting import solve_lu_with_pivoting

bp = Blueprint('lu_factorization', __name__, url_prefix='/methods')


@bp.route('/lu-factorization', methods=['GET'])
def lu_factorization_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            LU factorization (or LU decomposition) is a method of decomposing a square matrix 
                                            𝐴 into the product of two matrices: a lower triangular matrix 𝐿 and an upper triangular matrix 𝑈. 
                                            This decomposition is particularly useful for solving systems of linear equations, 
                                            inverting matrices, and computing determinants efficiently.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - A: coefficient matrix (nxn).
                                                - b: right-hand side vector (nx1).
                                                - pivot:
                                                    - False
                                                    - True
                                            OUTPUT:
                                                - x: solution vector to the system of equations Ax = b.
                                        '''}), 200)


@bp.route('/lu-factorization', methods=['POST'])
def lu_factorization_post() -> str:
    a = request.get_json('A')
    b = request.get_json('b')
    pivot = request.get_json('pivot')
    if not pivot:
        x, l, u = solve_lu(a, b)

        result = {
            'x': x,
            'L': l,
            'U': u
        }
    else:
        x, p, l, u = solve_lu_with_pivoting(a, b)

        result = {
            'x': x,
            'P': p,
            'L': l,
            'U': u
        }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

