import os
from flask import Flask
from dotenv import load_dotenv
from config import Config
from app.create_simple_plot import simple_plot_create_route as simple_plot_route_create_handler
from app.get_chart import handler_get_chart

load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")
app.config["UPLOAD_FOLDER"] = os.path.join(Config._app_dir,os.getenv("UPLOADS"))
app.register_blueprint(simple_plot_route_create_handler)
app.register_blueprint(handler_get_chart)
