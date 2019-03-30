from flask import Flask
import os

from models import db

def create_app():
    flask_app = Flask(__name__)
    basedir = os.path.abspath(os.path.dirname(__file__))
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = \
        'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_app.app_context().push()
    db.init_app(flask_app)
    db.create_all()
    return flask_app