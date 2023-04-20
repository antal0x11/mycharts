from flask import Flask
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER

    #Register blueprints

    # importing create chart route and get chart route
    from app.create_chart import create_chart_route as CreateChartRoute
    app.register_blueprint(CreateChartRoute)

    from app.get_chart import get_chart_route as GetChartRoute
    app.register_blueprint(GetChartRoute)


    @app.route('/')
    def index():
        return '<h2>Chart Server</h2>'
    
    return app
