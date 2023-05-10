import mysql.connector
from typing import List
import os

def client_info(client_id : str) -> List[str]:
    
    config_database = {
        "user" : os.getenv("DB_USER"),
        "password" : os.getenv("DB_PASSWORD"),
        "host" : os.getenv("DB_HOST"),
        "database" : os.getenv("DB_DATABASE")
    }

    try:
        cnx = mysql.connector.connect(**config_database)
        cursor = cnx.cursor()

        query = ("SELECT TITLE, CHART_ID, CHART_EXTENSION, CHART_TYPE, FILEPATH_TO_CHART, CREATED_AT FROM CLIENTS_CHARTS WHERE USERS_ID='%s'" % client_id)
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        cnx.close()

        if len(results) == 0 :
            return []
        else:
            return [{"title" : _item[0], "chart_id" : _item[1], "extension" : _item[2], "type" : _item[3], "path" : _item[4], "time_created" : _item[5]} for _item in results]
    except mysql.connector.Error as error:
        return []