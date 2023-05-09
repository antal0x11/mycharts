import os
import random
import mysql.connector

def random_chart_id() -> str: # chart id format ABCDE-12345, 5 letters and 5 digits seperated with -

    config_database = {
        "user" : os.getenv("DB_USER"),
        "password" : os.getenv("DB_PASSWORD"),
        "host" : os.getenv("DB_HOST"),
        "database" : os.getenv("DB_DATABASE")
    }

    try:
        cnx = mysql.connector.connect(**config_database)
        cursor = cnx.cursor()

        query = ("SELECT CHART_ID FROM CLIENTS_CHARTS")
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        cnx.close()

        chart_id = ''.join([random.choice('ABCDEFGHIJKLMNOPQRTSUVWXYZ') for _it in range(5)]) + '-' + ''.join([random.choice('0123456789') for _it in range(5)])

        while chart_id in results:

            chart_id = ''.join([random.choice('ABCDEFGHIJKLMNOPQRTSUVWXYZ') for _it in range(5)]) + '-' + ''.join([random.choice('0123456789') for _it in range(5)])  

        return chart_id

    except:
        return "" 
    

def generate_html_page(title : str) -> str:
    return  '<!DOCTYPE html>\n<head>\n<title>%s</title>\n</head>\n<body>\n<h3>You need to add proper path for your chart</h3>\n<img src="path/to/chart.svg" width="400" height="400"/>\n</body>\n</html>' % title

