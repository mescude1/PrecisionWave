""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('secant', __name__, url_prefix='methods')


@bp.route('/secant', methods=['GET'])
def secant_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The secant endpoint is running"


@bp.route('/secant', methods=['POST'])
def secant_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The secant endpoint is running"

