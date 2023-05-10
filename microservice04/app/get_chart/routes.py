'''
    Endpoint to respond with a chart.

    accepts a multipart-form/data type request 
    with key=chart_id and value={chart_id}
'''

from app.get_chart import handler_get_chart
from app.get_chart import find_charts
from flask import request
from flask import jsonify
from flask import send_file
import datetime

@handler_get_chart.route("/api/chart/get", methods=["GET"])
def handle_simple_plot_get():
    
    chart_id = request.form["chart_id"]

    chart_stored_path = find_charts.handle_send_chart(chart_id)

    if len(chart_stored_path) == 0 or chart_stored_path == None:
        return jsonify(
            {   
                "info" : "invalid",
                "time" : datetime.datetime.now().__str__().split(".")[0]
            }
        ), 400
    else:
        return send_file(chart_stored_path, as_attachment=True),200