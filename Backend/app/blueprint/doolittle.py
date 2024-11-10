from flask import abort, Blueprint, request, Response, make_response, jsonify
from Backend.app.pw_library.python_methods.doolittle import solve_doolittle

bp = Blueprint('doolittle', __name__, url_prefix='/methods')


@bp.route('/doolittle', methods=['GET'])
def doolittle_get() -> Response:

    response = make_response(jsonify({
        'message': 'Doolittle decomposition',
        'description': '''The Doolittle factorization is a way of decomposing a matrix 𝐴 into the product of a lower 
                          triangular matrix 𝐿 and an upper triangular matrix 𝑈, where the diagonal entries of 𝐿 are all 
                          1s.''',
        'instructions': '''Doolittle decomposition to solve for Ax=b.
                           Parameters:
                            A : The system matrix to be decomposed.
                            b : The solution vector
                        '''
    }))
    return response


@bp.route('/doolittle', methods=['POST'])
def doolittle_post() -> Response:
    if not request.is_json:
        abort(400)

    a = request.json.get('a')
    b = request.json.get('b')

    x, y, l, u = solve_doolittle(a, b)

    result = {
        'x': x,
        'y': y,
        'l': l,
        'u': u
    }

    return make_response(jsonify({'status': 'success','data': result}), 200)

