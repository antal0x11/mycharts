import mysql.connector
import os

def handle_send_chart(chart_id : str) -> str:

    '''
        Connects to database, and retrieves the path that the 
        chart is stored in filysystem
    '''

    config_database = {
        "user" : os.getenv("DB_USER"),
        "password" : os.getenv("DB_PASSWORD"),
        "host" : os.getenv("DB_HOST"),
        "database" : os.getenv("DB_DATABASE")
    }

    try:
        cnx = mysql.connector.connect(**config_database)
        cursor = cnx.cursor()

        query = ("SELECT FILEPATH_TO_CHART FROM CLIENTS_CHARTS WHERE CHART_ID='%s'" % chart_id)
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        cnx.close()

        if len(result) != 1 :
            return ""
        else:
            return result[0][0]
    except mysql.connector.Error as error:
        return ""