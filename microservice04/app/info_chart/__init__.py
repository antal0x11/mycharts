from flask import Blueprint

info_chart_route = Blueprint("info_chart", __name__)

from app.info_chart import routes