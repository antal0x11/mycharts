from flask import Blueprint

get_chart_route = Blueprint('get_chart',__name__)

from app.get_chart import routes