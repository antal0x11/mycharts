from flask import Blueprint

handler_get_chart = Blueprint("get_chart", __name__)

from app.get_chart import routes