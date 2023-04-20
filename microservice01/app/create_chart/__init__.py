from flask import Blueprint

create_chart_route = Blueprint('create_chart', __name__)

from app.create_chart import routes