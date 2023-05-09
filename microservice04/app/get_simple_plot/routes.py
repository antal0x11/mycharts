'''
    Endpoint to respond with all charts that a client has.
'''

from app.get_simple_plot import simple_plot_get_route
from flask import request
from flask import jsonify

@simple_plot_get_route.route("/api/chart/simple_plot", methods=["GET"])
def handle_simple_plot_get_all():
    
    client_id = request.form["user_id"]

    # TODO 
    # connect it with database and create a response onbject with all clients
    # chart id, date created, type and path

    charts = [{"chart" : 1, "apple" : 2}]
    
    return jsonify(
        {
            "user_id" : client_id,
            "charts" : charts
        }
    )
