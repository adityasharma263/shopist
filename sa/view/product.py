# -*- coding: utf-8 -*-

from sa.model.product import Product
from sa import app
from flask import jsonify, request
from sa.schema.product import ProductSchema


@app.route('/api/v1/product', methods=['GET', 'POST'])
def hotel_api():
    if request.method == 'GET':
        args = request.args.to_dict()
        search = args.get("search", None)
        args.pop('page', None)
        args.pop('per_page', None)
        args.pop('search', None)
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        products = Product.query.filter_by(**args).offset((page - 1) * per_page).limit(per_page).all()
        result = ProductSchema(many=True).dump(products)
        if search:
            seen = set()
            product = []
            for obj in result.data:
                for k in obj:
                    if isinstance(obj[k], str):
                        if search in obj[k]:
                            t = tuple(obj.items())
                            if t not in seen:
                                seen.add(t)
                                product.append(obj)
        else:
            product = result.data
        return jsonify({'result': {'product': product}, 'message': "Success", 'error': False})
    elif request.method == 'POST':
        post = Product(**request.json)
        post.save()
        result = ProductSchema().dump(post)
        return jsonify({'result': {'product': result.data}, 'message': "Success", 'error': False})


@app.route('/api/v1/product/<int:id>', methods=['PUT', 'DELETE'])
def product_id(id):
    if request.method == 'PUT':
        put = Product.query.filter_by(id=id).first()
        if put:
            if request.json.get('name'):
                put.name = request.json.get('name')
            if request.json.get('image_url'):
                put.image_url = request.json.get('image_url')
            if request.json.get('amazon_associates_url'):
                put.amazon_associates_url = request.json.get('amazon_associates_url')
            if request.json.get('amazon_price'):
                put.amazon_price = request.json.get('amazon_price')
            if request.json.get('brand'):
                put.brand = request.json.get('brand')
            if request.json.get('flipkart_associates_url'):
                put.flipkart_associates_url = request.json.get('flipkart_associates_url')
            if request.json.get('category'):
                put.category = request.json.get('category')
            if request.json.get('flipkart_price'):
                put.flipkart_price = request.json.get('flipkart_price')
            if request.json.get('snapdeal_associates_url'):
                put.snapdeal_associates_url = request.json.get('snapdeal_associates_url')
            if request.json.get('snapdeal_price'):
                put.snapdeal_price = request.json.get('snapdeal_price')
            put.update_db()
            result = ProductSchema().dump(put)
            return jsonify({'result': result.data, "status": "Success", 'error': False})
    else:
        product = Product.query.filter_by(id=id).first()
        if not product:
            return jsonify({'result': {}, 'message': "No Found", 'error': True}), 404
        Product.commit()
        return jsonify({'result': {}, 'message': "Success", 'error': False}), 204