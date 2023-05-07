'''
    This module removes given files, after their 
    evaluation.  
'''

import os
from flask import current_app

def server_data_source_cleanup(csv_file : str) -> bool:

    csv_data_delete_path = os.path.join(current_app.config["UPLOAD_FOLDER"],csv_file)

    try:
        os.remove(csv_data_delete_path)
        return True
    except FileNotFoundError:
        # TODO maybe add some kind of log
        return False