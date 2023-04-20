#
#   Evaluate json, csv data sources and parameters provided on request 
#

from config import Config
import json
import os
import re
import pandas as pd


def json_properties_evaluation(properties_pathname : str, plot_type : str) -> dict: 
    
    if plot_type == 'simple_plot':

        accepted_properties = ['title', 'x_title', 'y_title']

        with(open(os.path.join(Config.UPLOAD_FOLDER,properties_pathname), 'r')) as properties_source:
            properties = json.load(properties_source)

            if len(properties.keys()) != len(accepted_properties): #json object must have only the specified attributes
                return {}
            for _item in properties.keys():
                if _item not in accepted_properties or not isinstance(_item,str):
                    return {}

            return properties    
    
    elif plot_type == 'bar_label':
        
        accepted_properties = ['title']

        with(open(os.path.join(Config.UPLOAD_FOLDER,properties_pathname), 'r')) as properties_source:
            properties = json.load(properties_source)

            if len(properties.keys()) != len(accepted_properties): # json object must have only the specified attributes
                return {}
            for _item in properties.keys():
                if _item not in accepted_properties or not isinstance(_item,str): # json object must have only the specified attribute types
                    return {}
            return properties

    elif plot_type == 'scatter_plot_with_legend':
        
        accepted_properties = ['title']

        with(open(os.path.join(Config.UPLOAD_FOLDER,properties_pathname), 'r')) as properties_source:
            properties = json.load(properties_source)

            if len(properties.keys()) != len(accepted_properties): # json object must have only the specified attributes
                return {}
            for _item in accepted_properties:
                if _item not in accepted_properties or not isinstance(_item,str): # json object have only the specified attribute types
                    return {}
            return properties
    else:
        return {} # return an empty dictionary in case properties are incorrect

def csv_properties_evaluation(csv_data_file : str, plot_type : str) -> bool: #TODO
    
    if plot_type not in ['simple_plot', 'bar_label', 'scatter_plot_with_legend']:
        return False

    try:
        data = pd.read_csv(os.path.join(Config.UPLOAD_FOLDER,csv_data_file), encoding='utf-8', delimiter=',')
    except pd.errors.ParserError as csv_issue:
        return False

    if data.empty:
        return False
    
    first_row = [_it for _it in data.head(1)] # first row of csv file

    if plot_type == 'simple_plot': # Evaluate Integrity of csv file for simple plot chart
        
        if len(first_row) > 2 or 'x' not in first_row or 'y' not in first_row:
            return False
        
        for _item in data.loc[:,'x'].to_list():
            if not isinstance(_item,int):
                return False

        for _item in data.loc[:,'y'].to_list():
            if not isinstance(_item,int):
                return False 
            
    elif plot_type == 'bar_label':
        
        if first_row[0] != '#':
            return False
        
        for _item in first_row:
            if not isinstance(_item,str):
                return False
            if _item == '#':
                for _it in data.loc[:,_item].to_list():
                    if not isinstance(_it,str):
                        return False
            else:
                for _it in data.loc[:,_item].to_list(): # if a value is not given in a column but other are in column its nan so it fails
                    if not isinstance(_it,int): # TODO Maybe add real numbers too
                        return False
        
    elif plot_type == 'scatter_plot_with_legend': # TODO issue when csv is invalid, more values in a row than the atributes specified in first row
        
        if len(first_row) % 2 != 0 or len(first_row) == 0:
            return False
        
        for _it in range(0,len(first_row),2):
            if not isinstance(first_row[_it],str):
                return False
            
            atr_x = first_row[_it].split('_')
            atr_y = first_row[_it+1].split('_')

            if len(atr_x) != 2 or len(atr_y) != 2:
                return False

            if atr_x[0] != atr_y[0] or atr_x[1] != 'x' or atr_y[1] != 'y':
                return False
        
        for _item in first_row:
            for _it in data.loc[:,_item].to_list():
                if not isinstance(_it,int):
                    return False

    else:
        return False
    

    return True


def userid_integrity(provided_user_id : str): #provided user id format is ex. ADFG-872312, {4 letters - 6 digits}

    pattern = r"^[A-Z]{4}-\d{6}$"

    return True if re.search(pattern,provided_user_id) != None else False