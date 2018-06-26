# -*- coding: utf-8 -*-

from sa.model.product import Product
from sa import app
from flask import jsonify, request
from sa.schema.product import ProductSchema


@app.route('/api/v1/product', methods=['GET', 'POST'])
def hotel_api():
    if request.method == 'GET':
        args = request.args.to_dict()
        args.pop('page', None)
        args.pop('per_page', None)
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        products = Product.query.filter_by(**args).offset((page - 1) * per_page).limit(per_page).all()
        result = ProductSchema(many=True).dump(products)
        return jsonify({'result': {'product': result.data}, 'message': "Success", 'error': False})
    elif request.method == 'POST':
        post = Product(**request.json)
        post.save()
        result = ProductSchema().dump(post)
        return jsonify({'result': {'product': result.data}, 'message': "Success", 'error': False})


@app.route('/api/v1/message/<int:id>', methods=['PUT'])
def product_id(id):
    put = Product.query.filter_by(id=id).first()
    if put:
        put.status = request.json['status']
        put.update_db()
        result = ProductSchema().dump(put)
        return jsonify({'result': result.data, "status": "Success", 'error': False})