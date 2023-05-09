import os

class Config():
    _app_dir = os.path.abspath(os.path.dirname(__file__))
    STORE_CHARTS = os.path.join(_app_dir,"storage")

