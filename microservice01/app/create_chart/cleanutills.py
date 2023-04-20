#
#   Keep your server clean from unnecessary files
#

import os
from config import Config

def server_data_source_cleanup(json_path : str, csv_path : str) -> None:

    json_properties_delete_path = os.path.join(Config.UPLOAD_FOLDER,json_path)
    csv_data_delete_path = os.path.join(Config.UPLOAD_FOLDER,csv_path)

    try:
        os.remove(json_properties_delete_path)
        os.remove(csv_data_delete_path)
    except FileNotFoundError:
        # TODO maybe add some kind of log
        pass
