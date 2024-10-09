""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('incremental', __name__, url_prefix='methods')


@bp.route('/incremental', methods=['GET'])
def incremental_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The incremental endpoint is running"


@bp.route('/incremental', methods=['POST'])
def incremental_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The incremental endpoint is running"

