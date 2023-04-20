import sqlite3
from config import Config
import re

class Chart:
    def __init__(self,user_id : str = '',chart_id : str = '',path_to_chart : str = '', extension : str = '', empty : bool = False):
        self.user_id = user_id
        self.chart_id = chart_id
        self.path_to_chart = path_to_chart
        self.extension = extension
        self.empty = empty

    def get_user_id(self) -> str:
        return self.user_id
    
    def get_chart_id(self) -> str:
        return self.chart_id
    
    def get_path_to_chart(self) -> str:
        return self.path_to_chart
    
    def get_extension(self) -> str:
        return self.extension
    
    def is_empty(self) -> bool:
        return self.empty


def get_chart_info_place(chart_id : str) -> Chart:

    conn = sqlite3.connect(Config.DB)

    cursor = conn.cursor()

    cursor.execute('SELECT USERS_ID,CHART_ID,FILEPATH_TO_CHART,CHART_EXTENSION FROM USERS_CHARTS WHERE CHART_ID=?', (chart_id,))

    result = cursor.fetchone()

    cursor.close()
    conn.close()

    if result == None:
        return Chart(empty=True)
    else:
        return Chart(result[0],result[1],result[2],result[3])

def validate_integrity_of_chart_id(chart_id_input : str) -> bool:
    pattern = 'r^[A-Z]{5}-\d{5}$'

    return True if re.search(pattern,chart_id_input) != None else False