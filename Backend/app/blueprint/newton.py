""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('newton', __name__, url_prefix='/methods')


@bp.route('/newton', methods=['GET'])
def newton_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The newton endpoint is running"


@bp.route('/newton', methods=['POST'])
def newton_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The newton endpoint is running"

