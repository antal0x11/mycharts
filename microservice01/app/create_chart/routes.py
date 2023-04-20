from app.create_chart import create_chart_route
from flask import jsonify
from flask import request
import datetime
from app.create_chart import chartutills
from app.create_chart import audit
from app.create_chart import cleanutills
from config import Config
import os


'''
#   Accepts a post request with mandatory query parameters 
#   user and chart export type
#   also expect two files, one csv with data and one
#   json with properties
#
#   example : http://localhost:5000/setchart?userid=exampleUSer&chart_type=bar_label&extension=png
#
'''


@create_chart_route.route("/setchart", methods=['POST']) # TODO check the number of arguments you receive?
def set_chart():

    file_extension_types = ['png','pdf','svg','html']
    chart_type = ['bar_label','simple_plot','scatter_plot_with_legend']

    if 'userid' not in request.args.keys() or not audit.userid_integrity(request.args.get('userid')):
        return jsonify(
            {
                'chart status' : 'failed',
                'reason' : 'user id is invalid',
                'chart type' : request.args.get('chart_type'),
                'file format' : request.args.get('extension'), 
                'time' : datetime.datetime.now().__str__().split('.')[0]
            }), 500
    
    if 'extension' not in request.args.keys() or request.args.get('extension') not in file_extension_types:
        return jsonify(
            {
                'chart status' : 'failed',
                'reason' : 'extension is invalid',
                'chart type' : request.args.get('chart_type'),
                'file format' : request.args.get('extension'),
                'time' : datetime.datetime.now().__str__().split('.')[0]
            }), 500
    
    if 'chart_type' not in request.args.keys() or request.args.get('chart_type') not in chart_type:
        return jsonify(
            {
                'chart status' : 'failed',
                'user Id' : request.args.get('userid'),
                'reason' : 'chart type is invalid',
                'chart type' : request.args.get('chart_type'),
                'file format' : request.args.get('extension'),
                'time' : datetime.datetime.now().__str__().split('.')[0]
            }), 500
    

    if 'file_data' in request.files.keys() and 'properties' in request.files.keys(): #TODO check files extension
        csv_data_file = request.files['file_data']
        file_properties = request.files['properties']

        json_file_name =  '{0}_{1}_properties.json'.format(request.args.get('userid'),request.args.get('chart_type'))
        csv_file_name =  '{0}_{1}_data.csv'.format(request.args.get('userid'),request.args.get('chart_type'))

        file_properties.save(os.path.join(Config.UPLOAD_FOLDER, json_file_name))
        csv_data_file.save(os.path.join(Config.UPLOAD_FOLDER, csv_file_name))
                                                                  

        if request.args.get('chart_type') == 'simple_plot': # Simple Plot
            props = audit.json_properties_evaluation(json_file_name,request.args.get('chart_type'))
            if not bool(props) or not audit.csv_properties_evaluation(csv_file_name,request.args.get('chart_type')):
            
                cleanutills.server_data_source_cleanup(json_file_name,csv_file_name)

                return jsonify(
                    {
                        'chart status' : 'failed',
                        'reason' : 'properties are invalid',
                        'file format' : request.args.get('extension'),
                        'chart type' : request.args.get('chart_type'),
                        'time' : datetime.datetime.now().__str__().split('.')[0]
                    }
                ), 500

            chart_identification = chartutills.random_chart_id()

            val = chartutills.simple_plot(os.path.join(Config.UPLOAD_FOLDER, csv_file_name), props['title'], props['x_title'], props['y_title'], request.args.get('extension'), request.args.get('userid'), chart_identification, datetime.datetime.now().__str__().split('.')[0])
            print(val)
            cleanutills.server_data_source_cleanup(json_file_name,csv_file_name)
        
        elif request.args.get('chart_type') == 'bar_label': # Bar label plot
            
            props = audit.json_properties_evaluation(json_file_name, request.args.get('chart_type'))
            if not bool(props) or not audit.csv_properties_evaluation(csv_file_name,request.args.get('chart_type')):
                cleanutills.server_data_source_cleanup(json_file_name,csv_file_name)

                return jsonify(
                    {
                        'chart status' : 'failed',
                        'reason' : 'properties are invalid',
                        'file format' : request.args.get('extension'),
                        'chart type' : request.args.get('chart_type'),
                        'time' : datetime.datetime.now().__str__().split('.')[0]
                    }
                ), 500
            
            chart_identification = chartutills.random_chart_id()
            
            chartutills.bar_label_chart(os.path.join(Config.UPLOAD_FOLDER, csv_file_name), request.args.get('userid'), datetime.datetime.now().__str__().split('.')[0], props['title'], request.args.get('extension'), chart_identification)
            
            cleanutills.server_data_source_cleanup(json_file_name, csv_file_name)
        else: # scatter plot with legend 

            props = audit.json_properties_evaluation(json_file_name, request.args.get('chart_type'))
            if not bool(props) or not audit.csv_properties_evaluation(csv_file_name,request.args.get('chart_type')):
                cleanutills.server_data_source_cleanup(json_file_name,csv_file_name)

                return jsonify(
                    {
                        'chart status' : 'failed',
                        'reason' : 'properties are invalid',
                        'file format' : request.args.get('extension'),
                        'chart type' : request.args.get('chart_type'),
                        'time' : datetime.datetime.now().__str__().split('.')[0]
                    }
                ), 500

            chart_identification = chartutills.random_chart_id()

            chartutills.scatter_plot(os.path.join(Config.UPLOAD_FOLDER,csv_file_name), props['title'], request.args.get('userid'), chart_identification, datetime.datetime.now().__str__().split('.')[0], request.args.get('extension'))
            
            cleanutills.server_data_source_cleanup(json_file_name,csv_file_name)
    else:
        return jsonify(
            {
                'chart status' : 'failed',
                'reason' : 'missing data source file',
                'file format' : request.args.get('extenstion'),
                'chart type' : request.args.get('chart_type'),
                'time' : datetime.datetime.now().__str__().split('.')[0]
            }
        ), 500

    return jsonify(
        {
            'chart status' : 'completed',
            'user Id' : request.args.get('userid'),
            'chart type' : request.args.get('chart_type'),
            'file format' : request.args.get('extension'),
            'chart id' : chart_identification,
            'time' : datetime.datetime.now().__str__().split('.')[0],
        }), 200