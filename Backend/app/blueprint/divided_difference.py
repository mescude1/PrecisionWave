from flask import Blueprint, make_response, jsonify, request
from Backend.app.pw_library.python_methods.newton_divided_difference import newton_divided_difference_table

bp = Blueprint('divided_difference', __name__, url_prefix='/methods')


@bp.route('/divided-difference', methods=['GET'])
def divided_difference_get() -> str:

    return make_response(jsonify({'status': "success",
                                        'description': '''
                                            The Divided Difference Method is a technique used in numerical analysis for 
                                            constructing an interpolating polynomial that approximates a function based 
                                            on known data points. It is particularly useful in Newton's divided 
                                            difference interpolation, which uses a recursive formula to build the 
                                            polynomial. The method is flexible, enabling both efficient computation of 
                                            polynomial coefficients and ease in adding new data points without 
                                            recalculating the entire polynomial.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                                - x-values: coefficient matrix (nxn).
                                                - y-values: right-hand side vector (nx1).
                                            OUTPUT:
                                                - p: The Newton polynomial as a symbolic expression.
                                        '''}), 200)


@bp.route('/divided-difference', methods=['POST'])
def divided_difference_post() -> str:
    x = request.get_json('x')
    y = request.get_json('y')

    p, table_df = newton_divided_difference_table(x, y)

    result = {
        'p': p,
        'table_df': table_df
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

