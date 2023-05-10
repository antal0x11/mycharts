'''
    Endpoint that provides information for all clients charts

    GET /api/chart/info

    form-data

    user_id : {user_id}
'''

from flask import request
from flask import jsonify
from app.info_chart import information_chart
from app.info_chart import info_chart_route
import datetime

@info_chart_route.route("/api/chart/info", methods=["GET"])
def handle_client_info():

    user_id = request.form["user_id"]

    client_chart_information_response = information_chart.client_info(user_id)

    if len(client_chart_information_response) == 0:
        return jsonify(
            {
                "client" : user_id,
                "info" : "nothing found",
                "time" : datetime.datetime.now().__str__().split(".")[0]
            }
        ), 404
    else:
        return jsonify(
            {
                "client" : user_id,
                "time" : datetime.datetime.now().__str__().split(".")[0],
                "charts" : client_chart_information_response
            }
        ),200
