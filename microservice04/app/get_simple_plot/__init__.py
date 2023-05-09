from flask import Blueprint

simple_plot_get_route = Blueprint("simple_plot_get", __name__)

from app.get_simple_plot import routes