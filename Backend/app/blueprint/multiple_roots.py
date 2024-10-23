""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('multiple_roots', __name__, url_prefix='/methods')


@bp.route('/multiple-roots', methods=['GET'])
def multiple_roots_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The multiple roots endpoint is running"


@bp.route('/multiple-roots', methods=['POST'])
def multiple_roots_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The multiple roots endpoint is running"

