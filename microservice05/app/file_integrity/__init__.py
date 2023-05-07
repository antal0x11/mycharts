from flask import Blueprint

file_integrity_route = Blueprint("file_integrity", __name__)

from app.file_integrity import routes
