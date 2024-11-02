from flask import Blueprint, make_response, jsonify, request, abort

from Backend.app.pw_library.python_methods.incremental import incremental_search

bp = Blueprint('incremental', __name__, url_prefix='/methods')


@bp.route('/incremental', methods=['GET'])
def incremental_get() -> str:

    return make_response(jsonify({'success': True,
                                        'description': '''
                                            Incremental Search Method is a numerical method used to find the roots of a function
                                            (i.e., where the function equals zero).
                                            This method works by iteratively narrowing down an interval where a root
                                            lies.
                                            The goal is to find an approximation of the root with increasing precision.
                                        ''',
                                        'instructions': '''
                                            INPUT:
                                            - f: continuous function for which a sign change is sought.
                                            - x0: initial point.
                                            - h: step size (increment in each iteration).
                                            - Nmax: maximum number of iterations.
                                        
                                            OUTPUT:
                                            - a: left endpoint of the interval where a sign change occurs.
                                            - b: right endpoint of the interval where a sign change occurs.
                                            - iter: number of iterations performed.
                                            - data_frame: table of results with details of each iteration.
                                        '''}), 200)


@bp.route('/incremental', methods=['POST'])
def incremental_post() -> str:
    if not request.is_json:
        abort(400)

    f = request.json.get('f')
    h = request.json.get('g')
    x0 = request.json.get('x0')

    root, iterations, converged, df_result = incremental_search(f, x0, h)

    result = {
        'root': root,
        'iterations': iterations,
        'converged': converged,
        'df_result': df_result
    }

    return make_response(jsonify({'status': "success",
                                        'data': result}), 200)

