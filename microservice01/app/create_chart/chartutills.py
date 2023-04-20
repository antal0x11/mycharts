import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from config import Config
import os
import random
import sqlite3

'''
#   name of the chart stored on server is {userId}_{chartId}_{date}.{format}
#
'''

def bar_label_chart(data_source : str, user_id : str, chart_date : str, title : str, chart_ext : str, chart_id : str) -> bool:
    
    try:
        data = pd.read_csv(data_source, encoding='utf-8',delimiter=',')
    except pd.errors.ParserError:
        return False

    x_categories = tuple([_category_name for _category_name in data.head(1) if _category_name != '#'])
    source_fields = data.loc[:,'#'].to_list()

    obj_counts = {}

    values = [data.loc[:,_it].to_list() for _it in x_categories]

    for _it in range(len(source_fields)):
        obj_counts[source_fields[_it]] = np.array([_it[0] for _it in values])

    width = 0.6
    bottom = np.zeros(len(x_categories))
    fig, ax = plt.subplots()

    for _it, _item_count in obj_counts.items():
        p = ax.bar(x_categories, _item_count, width, label=_it, bottom=bottom)
        bottom += _item_count

        ax.bar_label(p, label_type='center')

    ax.set_title(title)
    ax.legend()

    try:
        os.mkdir(os.path.join(Config.STORE_CHARTS + "/%s/" % chart_ext,user_id))
    except (FileExistsError, FileNotFoundError ) as directoryIssue:
        if directoryIssue.errno != 17: # TODO 17 is the code for file Exists Error, maybe add more here for FileNotFoundError
            return False
        
    path_to_store_chart = Config.STORE_CHARTS + '/{0}/{1}/'.format(chart_ext,user_id) + user_id + '_' + chart_id + '_' + chart_date.split(' ')[0] + '.' + chart_ext

    if store_db_chart(user_id, chart_id, chart_ext, 'bar_label', path_to_store_chart):
        if chart_ext == 'html':
            with open(path_to_store_chart,'w') as html_file:
                html_file.write(generate_html_page(title))
            
            return True
        else:
            fig.savefig(path_to_store_chart)
        return True
    else:
        return False


def simple_plot(data_source : str, chart_title : str, x_axis_title : str, y_axis_title : str, chart_ext : str, user_id : str, chart_id : str, chart_date : str) -> bool:
    
    try:
        data = pd.read_csv(data_source, encoding='utf-8', delimiter=',')
    except pd.errors.ParserError:
        return False
    
    x = data.loc[:, 'x'].to_list() # get x column
    y = data.loc[:, 'y'].to_list() # get y column

    # create directory if it doesn't exist
    try:
        os.mkdir(os.path.join(Config.STORE_CHARTS + "/%s/" % chart_ext,user_id))
    except (FileExistsError, FileNotFoundError ) as directoryIssue:
        if directoryIssue.errno != 17: # TODO 17 is the code for file Exists Error, maybe add more here for FileNotFoundError
            return False

    fig, ax = plt.subplots()
    ax.plot(x,y)

    ax.set( xlabel=x_axis_title, ylabel=y_axis_title, title=chart_title)

    path_to_store_chart = Config.STORE_CHARTS + '/{0}/{1}/'.format(chart_ext,user_id) + user_id + '_' + chart_id + '_' + chart_date.split(' ')[0] + '.' + chart_ext

    if store_db_chart(user_id, chart_id, chart_ext, 'simple_plot', path_to_store_chart):
        if chart_ext == 'html':
            
            with open(path_to_store_chart,'w') as html_file:
                html_file.write(generate_html_page(chart_title))

            return True

        else:
            fig.savefig(path_to_store_chart)
        return True
    else:
        return False


def scatter_plot(data_source : str, chart_title : str, user_id : str, chart_id : str, chart_date : str, chart_ext : str) -> bool:
    
    colors = ['#D8BFD8','#9370DB','#ADD8E6', '#EFF660'] # TODO add more colors

    try:
        data = pd.read_csv(data_source, encoding='utf-8', delimiter=',')
    except pd.errors.ParserError:
        return False

    categories = [_item for _item in data.head(1)]

    x_y_data = {} # Each entry contains x,y coordinates in a list with two lists

    for _it in range(0,len(categories),2):
        x_y_data[categories[_it].split('_')[0]] = [data.loc[:,categories[_it]].to_list(), data.loc[:,categories[_it+1]].to_list()]    

    fig,ax = plt.subplots()

    scale = 70
    color_index = 0
#    random_color = random_hex_color()
#    colors = [random_color]


    for key in x_y_data:

#        while random_color not in colors:
#            colors.append(random_color)

        ax.scatter(x_y_data[key][0], x_y_data[key][1], c=colors[color_index] , s=scale, alpha=0.9, label=key, edgecolors='none')
#        random_color = random_hex_color()
        color_index = color_index + 1 if color_index < len(colors) else 0
        
    ax.set(title=chart_title)
    ax.legend(loc='upper right')
    
    try:
        os.mkdir(os.path.join(Config.STORE_CHARTS + "/%s/" % chart_ext,user_id))
    except (FileExistsError, FileNotFoundError ) as directoryIssue:
        if directoryIssue.errno != 17: # TODO 17 is the code for file Exists Error, maybe add more here for FileNotFoundError
            return False
    
    
    path_to_store_chart = Config.STORE_CHARTS + '/{0}/{1}/'.format(chart_ext,user_id) + user_id + '_' + chart_id + '_' + chart_date.split(' ')[0] + '.' + chart_ext

    if store_db_chart(user_id, chart_id, chart_ext, 'scatter_plot_with_legend', path_to_store_chart):
        if chart_ext == 'html':
            with open(path_to_store_chart,'w') as html_file:
                html_file.write(generate_html_page(chart_title))
            
            return True
        
        else:
            fig.savefig(path_to_store_chart)
        return True
    else:
        return False


def random_hex_color() -> str: #generate a random color for scatter plot woth legend
    return '#' + ''.join([random.choice('0123456789ABCDE') for _it in range(6)])


def random_chart_id() -> str: # chart id format ABCDE-12345, 5 letters and 5 digits seperated with -

    conn = sqlite3.connect(Config.DB)
    cursor = conn.cursor()

    cursor.execute('SELECT CHART_ID FROM USERS_CHARTS')
    
    results = cursor.fetchall()

    cursor.close()
    conn.close()

    chart_id = ''.join([random.choice('ABCDEFGHIJKLMNOPQRTSUVWXYZ') for _it in range(5)]) + '-' + ''.join([random.choice('0123456789') for _it in range(5)])

    while chart_id in results:
        chart_id = ''.join([random.choice('ABCDEFGHIJKLMNOPQRTSUVWXYZ') for _it in range(5)]) + '-' + ''.join([random.choice('0123456789') for _it in range(5)])  

    return chart_id

def store_db_chart(users_id : str, charts_id : str, chart_extension : str, chart_type : str, filepath_to_chart : str) -> bool:

    conn = sqlite3.connect(Config.DB)
    cursor = conn.cursor()

    cursor.execute('INSERT INTO USERS_CHARTS(USERS_ID,CHART_ID,CHART_EXTENSION,CHART_TYPE,FILEPATH_TO_CHART) VALUES (?,?,?,?,?)', (users_id,charts_id,chart_extension,chart_type,filepath_to_chart))

    conn.commit()

    store_result_resp = True if cursor.rowcount > 0 else False
    
    cursor.close()
    conn.close()

    return store_result_resp


def generate_html_page(title : str) -> str:
    return  '<!DOCTYPE html>\n<head>\n<title>%s</title>\n</head>\n<body>\n<h3>You need to add proper path for your chart</h3>\n<img src="path/to/chart.svg" width="400" height="400"/>\n</body>\n</html>' % title


      
    