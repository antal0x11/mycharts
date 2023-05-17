'''
    Simple Plot consumer. When it receives a message 
    with csv data (no checks are performed, data have
    been validated on a previus step), x-axis title,
    y-axis title and main chart title it creates a simple
    plot chart.

    It stores the created chart temporarily, and sends it 
    to an exchange(name = simple_plot_store) that is responsible 
    to store it the chart.

    It uses simple_plot_q that is binded with simple_plot_charts 
    exchange.

'''


import pika
import pandas as pd
import matplotlib.pyplot as plt
import io
import json
import os
import random
from metachart import Metachart
import datetime


def main():

    ''' 
        Listening for messages to consume.
    '''

    connection = pika.BlockingConnection(pika.ConnectionParameters(os.environ.get("RABBIT_HOST"), os.environ.get("RABBIT_PORT"), "/"))
    channel = connection.channel()

    channel.queue_bind(exchange="simple_plot_charts", queue="simple_plot_q")

    channel.basic_consume(queue="simple_plot_q", on_message_callback=callback_create_chart, auto_ack=True)

    channel.start_consuming()

def callback_create_chart(ch, method, properties, body) -> None:

    '''
        Creates the chart when it receives a message with matplotlib and
        stores it temporarily under /tmp with the following format, before
        passing it to the next queue.
        
        {user_id}_{chart_id}.{type}, where chart_id XXXXX-YYYYY,
        X -> A-Z, Y -> 0-9, and type { html, pdf, png, svg}

        The file is removed from the server after delivery to the next
        queue is complete.
    '''

    chart_attr = json.loads(properties.headers['properties'])
    xAxis = chart_attr["xAxis"]
    yAxis = chart_attr["yAxis"]
    title_chart = chart_attr["title"]
    user = chart_attr["user_id"]
    ext = chart_attr["extension"]
    dt = chart_attr["time"]
    
    # tmp folder path

    tmp_path = os.path.join(os.path.abspath(os.path.dirname(__file__)),"tmp") 
    tmp_file_path = os.path.join(tmp_path, user + "_" + tmp_random_chart_id() + "." + ext)

    chart_info = Metachart(title=title_chart, user_id=user, extension=ext, tmp_path=tmp_file_path,crafted=dt)

    csv_c = body.decode("utf-8")
    data = pd.read_csv(io.StringIO(csv_c))

    x = data.loc[:, "x"].to_list()
    y = data.loc[:, "y"].to_list()

    fig, ax = plt.subplots()
    ax.plot(x,y)
    ax.grid(True)
    ax.set(xlabel=xAxis, ylabel=yAxis, title=title_chart)

    fig.savefig(chart_info.tmp_path, dpi=300) #TODO handle html files

    print(" [+] Chart Created for {0} at {1}.".format(user, dt))
    print(" [+] Sending ...")
    
    send_to_store(chart_info)


    print(" [i] File saved.")
    print(" [x] Removing file....", end="")
    
    os.remove(chart_info.tmp_path)
    
    print("Done")
    
    plt.close()



def send_to_store(_info : Metachart):

    '''
        Creates a message for the store_simple_plot_q.
    '''

    with open(_info.tmp_path, "rb") as file:
        chart_bytes = file.read()

    connection_s = pika.BlockingConnection(pika.ConnectionParameters(host=os.environ.get("RABBIT_HOST")))
    channel_s = connection_s.channel()
    
    channel_s.exchange_declare(exchange="store_simple_plot_charts", exchange_type="fanout")
    channel_s.queue_declare(queue="store_simple_plot_q", durable=True)
    channel_s.queue_bind(queue="store_simple_plot_q", exchange="store_simple_plot_charts")
    
    chart_properties = json.dumps(_info.__dict__)

    props = pika.BasicProperties(headers={"properties" : chart_properties}) 
    
    channel_s.basic_publish(exchange="store_simple_plot_charts", 
                          routing_key="", 
                          body=chart_bytes, 
                          properties=props)

    print(" [+] Chart for user {0} sent at {1} !".format(_info.user_id, datetime.datetime.now().__str__()))
    connection_s.close()

def tmp_random_chart_id() -> str:

    '''
        Creates a temporary chart id of form XXXXX-YYYYY
        X: A-Z, Y: 0-9.
    '''
    return ''.join([random.choice('ABCDEFGHIJKLMNOPQRTSUVWXYZ') for _it in range(5)]) + '-' + ''.join([random.choice('0123456789') for _it in range(5)])


if __name__ == "__main__":
    try:
        print(" [+] Simple Plot Worker for myCharts v1.0.0")
        print("")
        main()
    except KeyboardInterrupt:
        print(" [+] Bye")
