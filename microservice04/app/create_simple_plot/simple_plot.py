import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
import datetime
import mysql.connector
from app.create_simple_plot import chart_utills
from config import Config

def chart(data_source : str, chart_title : str, x_axis_title : str, y_axis_title : str, chart_ext : str, user_id : str, chart_id : str) -> bool:
    
    chart_date_time = datetime.datetime.now().__str__().split(".")[0]

    try:
        data = pd.read_csv(data_source, encoding='utf-8', delimiter=',')
    except pd.errors.ParserError:
        return False
    
    x = data.loc[:, 'x'].to_list() # get x column
    y = data.loc[:, 'y'].to_list() # get y column

    # create directory if it doesn't exist
    try:
        os.mkdir(os.path.join(Config.STORE_CHARTS,chart_ext,user_id))
    except (FileExistsError, FileNotFoundError ) as directoryIssue:
        if directoryIssue.errno != 17: # TODO 17 is the code for file Exists Error, maybe add more here for FileNotFoundError
            return False

    fig, ax = plt.subplots()
    ax.plot(x,y)
    ax.grid(True)

    ax.set( xlabel=x_axis_title, ylabel=y_axis_title, title=chart_title)

    path_to_store_chart = os.path.join(Config.STORE_CHARTS,chart_ext,user_id,chart_id + '.' + chart_ext)

    if store_db_chart(user_id, chart_id, chart_ext, path_to_store_chart):
        if chart_ext == 'html':
            
            with open(path_to_store_chart,'w') as html_file:
                html_file.write(chart_utills.generate_html_page(chart_title))

            return True
        else:
            fig.savefig(path_to_store_chart)
        return True
    else:
        return False
    

def store_db_chart(users_id : str, charts_id : str, chart_extension : str, filepath_to_chart : str) -> bool:

    config_database = {
        "user" : os.getenv("DB_USER"),
        "password" : os.getenv("DB_PASSWORD"),
        "host" : os.getenv("DB_HOST"),
        "database" : os.getenv("DB_DATABASE")
    }

    try:
        cnx = mysql.connector.connect(**config_database)
        cursor = cnx.cursor()

        new_chart = ("INSERT INTO CLIENTS_CHARTS (USERS_ID,CHART_ID,CHART_EXTENSION,CHART_TYPE,FILEPATH_TO_CHART) " 
                    "VALUES (%(USERS_ID)s,%(CHART_ID)s,%(CHART_EXTENSION)s,%(CHART_TYPE)s,%(FILEPATH_TO_CHART)s) ")

        chart = {
            "USERS_ID" : users_id,
            "CHART_ID" : charts_id,
            "CHART_EXTENSION" : chart_extension,
            "CHART_TYPE" : "simple_plot",
            "FILEPATH_TO_CHART" : filepath_to_chart
        }

        cursor.execute(new_chart,chart)

        db_commit = cursor.rowcount

        cnx.commit()

        cursor.close()
        cnx.close()

    except mysql.connector.Error as error:
        print(error)
        return False

    return True if db_commit == 1 else False
    