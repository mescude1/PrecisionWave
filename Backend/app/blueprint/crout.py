from flask import (
    abort, Blueprint, request, Response, make_response, jsonify
)

from ..pw_library.python_methods.crout import solve_crout

bp = Blueprint('crout', __name__, url_prefix='/methods')


@bp.route('/crout', methods=['GET'])
def crout_get() -> Response:

    response = make_response(jsonify({
        'message': 'Crout decomposition',
        'description': '''Crout decomposition is a method for decomposing a matrix 𝐴 into the product of a lower 
                          triangular matrix 𝐿 and an upper triangular matrix 𝑈''',
        'instructions': '''Crout decomposition to solve for Ax=b.
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

    x, y, l, u = solve_crout(a, b)

    result = {
        'x': x,
        'y': y,
        'l': l,
        'u': u
    }

    return make_response(jsonify({'status': 'success','data': result}), 200)

