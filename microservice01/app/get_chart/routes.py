from app.get_chart import get_chart_route
from flask import request,send_file, jsonify
import datetime
from app.get_chart import charthandler

@get_chart_route.route('/getchart', methods=['GET']) # TODO add status error code?
def get_chart():

    if 'chart_id' not in request.args.keys():
        return jsonify(
            {
                'status' : 'failure',
                'info' : 'missing arguments',
                'time' : datetime.datetime.now().__str__().split('.')[0]
            }
        ),400
    
    chart_info_place = charthandler.get_chart_info_place(request.args.get('chart_id'))

    if chart_info_place.is_empty():
        return jsonify(
            {
                'status' : 'failure',
                'info' : 'chart not found',
                'time' : datetime.datetime.now().__str__().split('.')[0]
            }
        ),404

    if chart_info_place.extension == 'png':
        response_mimetype = 'image/png'
    elif chart_info_place.extension == 'pdf':
        response_mimetype = 'application/pdf'
    elif chart_info_place.extension == 'svg':
        response_mimetype = 'image/svg+xml'
    else:
        response_mimetype = 'text/html'




    try:
        return send_file(chart_info_place.get_path_to_chart(), mimetype=response_mimetype, as_attachment=False),200
    except FileNotFoundError:
        return jsonify(
            {
                'status' : 'failure',
                'info' : 'an unexpected error occured',
                'time' : datetime.datetime.now().__str__().split('.')[0]
            }
        ), 500