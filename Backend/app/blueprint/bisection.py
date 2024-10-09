""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('bisection', __name__, url_prefix='methods')


@bp.route('/bisection', methods=['GET'])
def bisection_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The bisection endpoint is running"


@bp.route('/bisection', methods=['POST'])
def bisection_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The bisection endpoint is running"

