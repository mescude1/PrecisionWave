""" This module contains the 'index' Blueprint which organize and
group, views related to the index endpoint of HTTP REST API.
"""


from flask import Blueprint


bp = Blueprint('false_rule', __name__, url_prefix='/methods')


@bp.route('/false-rule', methods=['GET'])
def false_rule_get() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The false rule endpoint is running"


@bp.route('/false-rule', methods=['POST'])
def false_rule_post() -> str:
    """This function is responsible to deal with requests
    coming from index URL. It return a simple text indicating
    the server is running.

    Returns:
        str: a text message
    """

    return "The false rule endpoint is running"

