from flask import Flask, request, jsonify
from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

from __init__ import create_app
from models import db, Features


app = create_app()
CORS(app)
ma = Marshmallow(app)

class FeaturesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'client',
            'priority', 'target_date', 'product_area', 'complete')

feature_schema = FeaturesSchema(strict=True)
features_schema = FeaturesSchema(many=True, strict=True)


# Create a Features
@app.route('/feature', methods=['POST'])
def add_feature():
    title = request.json['title']
    description = request.json['description']
    client = request.json['client']
    priority = request.json['priority']
    target_date = request.json['target_date']
    product_area = request.json['product_area']
    
    # format date
    format_date = "%m/%d/%Y"
    target_date = (datetime.strptime(target_date, format_date)).date()

    # Replace priority
    all_features = Features.query.order_by(Features.priority).filter_by(client=client).all()

    number = int(priority)
    for feature in all_features:
        if feature.priority == number:
            number = number + 1
            feature.priority = number
            db.session.commit()

    # new_feature = Features(title, description, client, priority, target_date, product_area)
    new_feature = Features(
        title=title, description=description, 
        client=client, priority=priority,
        target_date=target_date, 
        product_area=product_area,
        complete=0)

    db.session.add(new_feature)
    db.session.commit()

    return feature_schema.jsonify(new_feature)


# Get All Features
@app.route('/feature', methods=['GET'])
def get_features():
    all_features = Features.query.all()
    result = features_schema.dump(all_features)
    print(result)
    return jsonify(result.data)


# Get Single Feature
@app.route('/feature/<id>', methods=['GET'])
def get_feature(id):
    product = Features.query.get(id)
    return feature_schema.jsonify(product)


# Update a Feature
@app.route('/feature/<id>', methods=['PUT'])
def update_feature(id):
    feature = Features.query.get(id)
    print(feature)
    title = request.json['title']
    description = request.json['description']
    client = request.json['client']
    priority = request.json['priority']
    target_date = request.json['target_date']
    product_area = request.json['product_area']

    # format date
    try:
        format_date = "%Y-%m-%d"
        target_date = (datetime.strptime(target_date, format_date)).date()
    except:
        format_date = "%m/%d/%Y"
        target_date = (datetime.strptime(target_date, format_date)).date()
    
    feature.title = title
    feature.description = description
    feature.client = client
    feature.priority = priority
    feature.target_date = target_date
    feature.product_area = product_area
    
    db.session.commit()

    return feature_schema.jsonify(feature)

@app.route('/feature/<id>/complete', methods=['PUT'])
def complete_feature(id):
    feature = Features.query.get(id)

    feature.complete = 1
    
    db.session.commit()

    return feature_schema.jsonify(feature)


# Delete Feature
@app.route('/feature/<id>', methods=['DELETE'])
def delete_feature(id):
    feature = Features.query.get(id)
    db.session.delete(feature)
    db.session.commit()
    
    return feature_schema.jsonify(feature)


@app.route('/feature/order', methods=['GET'])
def order():
    order_by = request.args.get('by')

    all_features = Features.query.order_by(order_by).all()
    result = features_schema.dump(all_features)
    return jsonify(result.data)


# Run Server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)