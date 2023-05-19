from app.file_integrity.chart_type import Chart
import pika
import json
import os

def enq_simple_plot(tmp_path : str, chart_obj : Chart) -> None: #TODO add try/catch

    '''
    
        Enqueues a validated data file for a simple plot chart 
    
    '''

    connection = pika.BlockingConnection(pika.ConnectionParameters(host=os.getenv("RABBIT_HOST"),port=os.getenv("RABBIT_PORT")))
    channel = connection.channel()

    channel.exchange_declare(exchange="simple_plot_charts", exchange_type="fanout")
    channel.queue_declare(queue="simple_plot_q", durable=True)

    channel.queue_bind(queue="simple_plot_q", exchange="simple_plot_charts")

    with open(tmp_path, "rb") as data_file:
        msg = data_file.read()

        chart_properties = json.dumps(chart_obj.__dict__)

        props = pika.BasicProperties(headers={"properties" : chart_properties}) 
    
        channel.basic_publish(exchange="simple_plot_charts", 
                              routing_key="", 
                              body=msg, 
                              properties=props)

    connection.close()