import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY='secretKey' #change secret key
    UPLOAD_FOLDER = basedir + '/data'
    STORE_CHARTS = basedir + '/charts'
    DB = basedir + '/database/charts.db'
