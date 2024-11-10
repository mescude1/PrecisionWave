from flask import Blueprint, make_response, jsonify, request
from Backend.app.pw_library.python_methods.spline_quadratic import quadratic_spline_coefficients
from Backend.app.pw_library.python_methods.spline_cubic import cubic_spline_coefficients
from Backend.app.pw_library.python_methods.spline_linear import linear_spline_coefficients

bp = Blueprint('spline_interpolation', __name__, url_prefix='/methods')


@bp.route('/spline-interpolation', methods=['GET'])
def gaussian_elimination_get() -> str:
    return make_response(jsonify({'status': "success",
                                  'description': '''
                                            Spline interpolation is a technique for constructing a smooth curve through 
                                            a set of data points. It uses "splines," which are piecewise polynomial 
                                            functions that join smoothly at specified points. Unlike simpler methods 
                                            like linear or polynomial interpolation, splines avoid overfitting and 
                                            extreme oscillations by balancing smoothness with flexibility, making them 
                                            especially useful for modeling data with complex patterns.
                                        ''',
                                  'instructions': '''
                                            INPUT:
                                                - x-values: vector of values for x.
                                                - y-values: vector of values for y.
                                                - type:
                                                    - linear
                                                    - quadratic
                                                    - cubic
                                            OUTPUT:
                                                - coefic: solution vector to the system of equations Ax = b.
                                        '''}), 200)


@bp.route('/gaussian-elimination', methods=['POST'])
def gaussian_elimination_post() -> str:
    x_values = request.get_json('x-values')
    y_values = request.get_json('y-values')
    interpolation_type = request.get_json('type')

    if interpolation_type == 'linear':
        coeff = linear_spline_coefficients(x_values, y_values)
        polynomial = r''
    elif interpolation_type == 'quadratic':
        coeff = quadratic_spline_coefficients(x_values, y_values)
        polynomial = r''
    else:
        coeff = cubic_spline_coefficients(x_values, y_values)
        polynomial = r''

    result = {
        'coeff': coeff,
        'polynomial': polynomial,
        'type': interpolation_type
    }

    return make_response(jsonify({'status': "success", 'data': result}), 200)

