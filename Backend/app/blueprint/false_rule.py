from flask import Blueprint, Response, make_response, jsonify, request, abort
from app.pw_library.python_methods.false_rule import false_rule

bp = Blueprint('false_rule', __name__, url_prefix='/methods')


@bp.route('/false-rule', methods=['GET'])
def false_rule_get() -> Response:

    return make_response(jsonify({
        'status': 'success',
        'description': '''The false position method (also known as the regula falsi method) is a root- finding technique 
                          used in numerical analysis. It is similar to the bisection method in that it iteratively 
                          narrows down an interval where a root of a function exists. However, instead of using the 
                          midpoint of the interval as in the bisec- tion method, the false position method uses a 
                          more refined estimate by linearly interpolating the function between the endpoints.''',
        'instructions': '''INPUT:
                            - f: continuous function for which a sign change is sought.
                            - x0: initial point.
                            - h: step size (increment in each iteration).
                            - Nmax: maximum number of iterations.
                            OUTPUT:
                            - a: left endpoint of the interval where a sign change occurs.
                            - b: right endpoint of the interval where a sign change occurs.
                            - iter: number of iterations performed.
                            - data_frame: table of results with details of each iteration.
                        '''
    }),200)


@bp.route('/false-rule', methods=['POST'])
def false_rule_post() -> Response:
    if not request.is_json:
        abort(400)

    f = request.json.get('f')
    a = float(request.json.get('a'))
    b = float(request.json.get('b'))

    x, iter, err, result_array = false_rule(f, a, b)

    result = {
        'x': x,
        'iter': iter,
        'err': err,
        'df_result': result_array.to_json()
    }
    return make_response(jsonify({'status': "success", 'data': result}), 200)

