
'''

    audit module is responsible to verify the integrity of
    csv data source file. It performs necessary checks to 
    ensure that the structure for the specifi plot type is
    correct.

'''



from flask import current_app
import pandas as pd
import numpy as np
import os

def csv_properties_evaluation(csv_data_file : str, plot_type : str) -> bool: #TODO add status codes

    try:
        data = pd.read_csv(os.path.join(current_app.config["UPLOAD_FOLDER"],csv_data_file), encoding='utf-8', delimiter=',')
    except pd.errors.ParserError as csv_issue:
        return False

    if data.empty:
        return False
    
    first_row = [_it for _it in data.head(1)] # first row of csv file

    if plot_type == 'simple_plot': # Evaluate Integrity of csv file for simple plot chart
        
        if len(first_row) > 2 or 'x' not in first_row or 'y' not in first_row:
            return False
        
        for _item in data.loc[:,'x'].to_list():
            if np.isnan(_item):
                return False
            if not isinstance(_item,int) and not isinstance(_item,float):
                return False

        for _item in data.loc[:,'y'].to_list():
            
            if np.isnan(_item):
                return False
            
            if not isinstance(_item,int) and not isinstance(_item,float):
                return False 
            
    elif plot_type == 'bar_plot':
        
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
                for _it in data.loc[:,_item].to_list():
                    if np.isnan(_it):
                        return False
                    
                    if not isinstance(_it,int) and not isinstance(_it,float):
                        return False
        
    elif plot_type == 'scatter_plot':
        
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

                if np.isnan(_it):
                    return False

                if not isinstance(_it,int) and not isinstance(_it,float):
                    return False
    
    else:
        return False
    

    return True
