from flask import Blueprint, make_response, jsonify, request, abort

from app.pw_library.python_methods.lagrange import lagrange_polynomial
from app.pw_library.python_methods.newton_divided_difference import newton_divided_difference_table
from app.pw_library.python_methods.spline_cubic import cubic_spline_coefficients
from app.pw_library.python_methods.spline_linear import linear_spline_coefficients
from app.pw_library.python_methods.spline_quadratic import quadratic_spline_coefficients
from app.pw_library.python_methods.vandermonde import vandermonde_linear_regression

bp = Blueprint('newton', __name__, url_prefix='/methods')

@bp.route('/regression', methods=['GET'])
def newton_get() -> str:
    return make_response(jsonify({'status': "success",
                                  'description': '''
                                               Interpolation methods are techniques used to estimate unknown values that 
                                               fall between known data points. These methods are essential in data 
                                               analysis, numerical modeling, and computer graphics when an exact solution 
                                               is needed for a set of values that do not explicitly exist within the dataset. 
                                               Common interpolation methods include linear interpolation, which connects 
                                               two data points with a straight line; polynomial interpolation, which fits 
                                               a polynomial curve to a set of data points; and spline interpolation, 
                                               which uses piecewise polynomials (often cubic) to create a smooth curve 
                                               that passes through all the data points. 
                                           ''',
                                  'instructions': '''
                                               INPUT:
                                               - csv file: A CSV file with 2 columns x and y which are vectors of floats
                                               - type: type of interpolation to apply:
                                                   - newton: newton divided differences.
                                                   - lagrange: lagrange polynomial
                                                   - vandermonde: vandermonde matrix.
                                                   - linear: linear spline interpolation.
                                                   - quadratic: quadratic spline interpolation.
                                                   - cubic: cubic spline interpolation.

                                               OUTPUT:
                                               - x: approximate root of the function f.
                                               - n: number of iterations performed.
                                               - result_array: table with details of each iteration.
                                           '''}), 200)


@bp.route('/newton', methods=['POST'])
def newton_post() -> str:
    if not request.is_json:
        abort(400)
    x = request.json.get('x')
    y = request.json.get('y')
    type_inter = request.json.get('type')

    if type_inter == 'newton':
        p, table_df = newton_divided_difference_table(x, y)
        result = {
            'p': p,
            'table_df': table_df
        }
    elif type_inter == 'lagrange':
        p = lagrange_polynomial(x, y)
        result = {
            'p': p,
        }
    elif type_inter == 'vandermonde':
        p, matrix_df, vector_df = vandermonde_linear_regression(x, y)
        result = {
            'p': p,
            'matrix_df': matrix_df,
            'vector_df': vector_df
        }
    elif type_inter == 'linear':
        coeff = linear_spline_coefficients(x, y)
        result = {'coeff': coeff}
    elif type_inter == 'quadratic':
        coeff = quadratic_spline_coefficients(x, y)
        result = {'coeff': coeff}
    elif type_inter == 'cubic':
        coeff = cubic_spline_coefficients(x, y)
        result = {'coeff': coeff}
    else:
        coeff = cubic_spline_coefficients(x, y)
        result = {'coeff': coeff}

    return make_response(jsonify({'status': "success", 'data': result}), 200)