'''

    Endpoint to create and respond with a simple plot chart

'''
from app.create_simple_plot import simple_plot_create_route
import os
from flask import request
from flask import jsonify
from flask import current_app
from app.create_simple_plot import chart_utills
from app.create_simple_plot import simple_plot
from app.create_simple_plot import server_clean

@simple_plot_create_route.route("/api/chart/simple_plot", methods=["POST"])
def simple_plot_handler():
    
    title = request.form["title"]
    x_Axis = request.form["xAxis"]
    y_Axis = request.form["yAxis"]
    chart_extension = request.form["extension"]
    user_id = request.form["user_id"]
    chart_id = chart_utills.random_chart_id()
    csv_data_source = request.files["file"]
    csv_file_name = "{0}_{1}_data.csv".format(user_id,chart_id) 

    csv_path = os.path.join(current_app.config["UPLOAD_FOLDER"],csv_file_name) 
    csv_data_source.save(csv_path)
    
    if simple_plot.chart(csv_path, title, x_Axis, y_Axis, chart_extension, user_id, chart_id):
        server_clean.server_data_source_cleanup(csv_path)

        return jsonify(
            {
                "info" : "simple_plot",
                "status" : "completed"
            }
        ),200
    
    else:
        return jsonify(
            {
                "info" : "looks like something broke"
            }
        ),500