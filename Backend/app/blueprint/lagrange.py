from flask import Blueprint, make_response, jsonify, request
from Backend.app.pw_library.python_methods.lagrange import lagrange_polynomial

bp = Blueprint('lagrange', __name__, url_prefix='/methods')


@bp.route('/lagrange', methods=['GET'])
def lagrange_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            The Lagrange Interpolation Method is a polynomial interpolation technique 
                                            used to approximate a function based on a set of known points. Given a set 
                                            of data points, the method constructs a polynomial that passes through each 
                                            of these points. This polynomial can then be used to estimate intermediate 
                                            values, effectively "filling in the gaps" in the data.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - x-values: coefficient matrix (nxn).
                                                - y-values: right-hand side vector (nx1).
                                            OUTPUT:
                                                - p: The Lagrange polynomial as a symbolic expression.
                                        '''}), 200)


@bp.route('/lagrange', methods=['POST'])
def lagrange_post() -> str:
    x = request.get_json('x')
    y = request.get_json('y')
    p = lagrange_polynomial(x, y)

    return make_response(jsonify({'status': "success",
                                        'data': p,
                                        'x-values': x,
                                        'y-values': y
                                  }), 200)

