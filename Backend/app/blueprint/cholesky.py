from flask import (
    abort, Blueprint, request, Response, make_response, jsonify
)

from ..pw_library.python_methods.cholesky import solve_cholesky

bp = Blueprint('cholesky', __name__, url_prefix='/methods')


@bp.route('/cholesky', methods=['GET'])
def cholesky_get() -> Response:

    response = make_response(jsonify({
        'message': 'Bisection method',
        'description': '''Cholesky decomposition is a numerical method used to decompose a symmetric positive-definite 
                          matrix 𝐴 into the product of a lower triangular matrix 𝐿 and its conjugate transpose 𝐿∗ 
                          (for real matrices, 𝐿𝑇, the standard transpose). 
                          This decomposition is particularly useful for solving systems of linear equations, inverting 
                          matrices, and computing determinants in a computationally efficient way.''',
        'instructions': '''Cholesky decomposition to solve for Ax=b.
                           Parameters:
                            A : The system matrix to be decomposed.
                            b : The solution vector
                        '''
    }))
    return response


@bp.route('/cholesky', methods=['POST'])
def cholesky_post() -> Response:
    if not request.is_json:
        abort(400)

    a = request.json.get('a')
    b = request.json.get('b')

    x, y, l = solve_cholesky(a, b)

    result = {
        'x': x,
        'y': y,
        'L': l
    }

    return make_response(jsonify({'status': 'success','data': result}), 200)

