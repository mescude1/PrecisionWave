from flask import Blueprint, make_response, jsonify, request
from Backend.app.pw_library.python_methods.vandermonde import vandermonde_linear_regression

bp = Blueprint('vandermonde', __name__, url_prefix='/methods')


@bp.route('/vandermonde', methods=['GET'])
def vandermonde_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            The Vandermonde matrix method for linear regression constructs a polynomial 
                                            fit to the data by forming a matrix with powers of the input variable. To 
                                            manually perform linear regression this way, we calculate the coefficients 
                                            of the polynomial that best fit the data by solving a system of linear equations.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - x-values: coefficient matrix (nxn).
                                                - y-values: right-hand side vector (nx1).
                                            OUTPUT:
                                                - p: The Newton polynomial as a symbolic expression.
                                        '''}), 200)


@bp.route('/vandermonde', methods=['POST'])
def vandermonde_post() -> str:
    x = request.get_json('x')
    y = request.get_json('y')
    p, matrix_df, vector_df = vandermonde_linear_regression(x, y)

    result = {
        'p': p,
        'matrix': matrix_df,
        'vector': vector_df
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

