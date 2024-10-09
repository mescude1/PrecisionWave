""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('gaussian_elimination', __name__, url_prefix='methods')


@bp.route('/gaussian-elimination', methods=['GET'])
def gaussian_elimination_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The gaussian elimination endpoint is running"


@bp.route('/gaussian-elimination', methods=['POST'])
def gaussian_elimination_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The gaussian elimination endpoint is running"

