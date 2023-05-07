'''
    This endpoint validates required attributes and data source file.
'''

from app.file_integrity import file_integrity_route
from app.file_integrity import file_utills
from app.file_integrity import audit
from app.file_integrity import server_clean

from flask import current_app
from flask import request
from flask import jsonify
import datetime
import os

@file_integrity_route.route("/api/data/integrity", methods=["POST"])
def file_integrity():

    file_extension_type = ["png", "pdf", "svg", "html"]
    file_name_suffix = ["csv"]
    chart_type = ['bar_plot','simple_plot','scatter_plot']
    proprties = ["title", "extension", "type", "xAxis", "yAxis"]

    if len(request.form) != 3 and len(request.form) != 5:
        return (
            {
                "info" : "fail",
                "reason" : "missing properties"
            }
        ),400
    
    for _attr in request.form.keys():
        if _attr not in proprties or not isinstance(request.form.get(_attr), str): #NOTE check again numbers
            return jsonify(
                {
                    "info" : "fail",
                    "reason" : "Invalid properties"
                }
            ),400

    if request.form["extension"] not in file_extension_type or request.form["type"] not in chart_type:
        return jsonify(
            {
                "info" : "fail",
                "reason" : "invalid type or extension"
            }
        ), 400
    
    if not request.form["title"]:
        return jsonify(
            {
                "info" : "fail",
                "reason" : "empty title is not acceptable"
            }
        ),400
        
    if request.form["type"] == "simple_plot" and len(request.form) != 5:
        return jsonify(
            {
                "info" : "fail",
                "reason" : "missing arguments"
            }
        ),400
    
    if request.form["type"] != "simple_plot" and len(request.form) != 3:
        return jsonify(
            {
                "info" : "fail",
                "reason" : "invalid arguments"
            }
        ),400
    
    
    
    if  request.form["type"] == "simple_plot" and (not request.form["xAxis"] or not request.form["yAxis"]):
        return jsonify(
            {
                "info" : "fail",
                "reason" : "empty axis title are not acceptable for simple plot"
            }
        ),400

    if len(request.files) != 1:
        return jsonify(
            {
                "info" : "fail",
                "reason" : "missing data source file"
            }
        ),400
    
    if "file" not in request.files.keys():
        return jsonify(
            {
                "info" : "fail",
                "reason" : "missing key"
            }
        ),400
    
    usr_file_name = request.files.get("file").filename
    if len(usr_file_name.split(".")) != 2 or usr_file_name.split(".")[1] not in file_name_suffix:
        print(usr_file_name)
        return jsonify(
            {
                "info" : "fail",
                "reason" : "file type is not acceptable"
            }
        ),400

    while True:
        tmp_data_file_name = file_utills.random_file_name()

        if tmp_data_file_name not in os.listdir(current_app.config["UPLOAD_FOLDER"]):
            break

    request.files.get("file").save(os.path.join(current_app.config["UPLOAD_FOLDER"],tmp_data_file_name))
    
    if audit.csv_properties_evaluation(tmp_data_file_name, request.form["type"]):
        
        if server_clean.server_data_source_cleanup(tmp_data_file_name):
            # TODO maybe add some log
            pass

        return jsonify(
            {
                "info" : "valid",
                "source" : usr_file_name,
                "time" : datetime.datetime.now().__str__().split(".")[0]
            }
        ),200

    else:

        if not server_clean.server_data_source_cleanup(tmp_data_file_name):
            #TODO maybe add some log
            pass

        return jsonify(
            {
                "info" : "fail",
                "source" : usr_file_name,
                "reason" : "file is invalid",
                "time" : datetime.datetime.now().__str__().split(".")[0]
            }
        ), 400
