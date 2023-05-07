import os
from flask import Flask
from app.file_integrity import file_integrity_route as FileIntegrityRoute
from dotenv import load_dotenv
from config import Config
from werkzeug.middleware.proxy_fix import ProxyFix

load_dotenv()

app = Flask(__name__)

app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

app.secret_key = os.getenv("SECRET_KEY")
app.config["UPLOAD_FOLDER"] = os.path.join(Config.dir_base,os.getenv("UPLOADS")) 
app.register_blueprint(FileIntegrityRoute)

