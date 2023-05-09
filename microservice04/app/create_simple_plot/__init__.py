from flask import Blueprint

simple_plot_create_route = Blueprint("create_simple_plot", __name__)

from app.create_simple_plot import routes