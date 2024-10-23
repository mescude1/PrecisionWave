""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('fixed_point', __name__, url_prefix='/methods')


@bp.route('/fixed-point', methods=['GET'])
def fixed_point_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The fixed point endpoint is running"


@bp.route('/fixed-point', methods=['POST'])
def fixed_point_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The fixed point endpoint is running"

