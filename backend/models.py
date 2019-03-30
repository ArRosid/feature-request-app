from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Features(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), unique=True)
    description = db.Column(db.String(200))
    client = db.Column(db.String(20))
    priority = db.Column(db.Integer)
    target_date = db.Column(db.Date)
    product_area = db.Column(db.String(20))
    complete = db.Column(db.Integer, default=0)
