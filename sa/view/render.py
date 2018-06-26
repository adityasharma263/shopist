# -*- coding: utf-8 -*-
__author__ = 'aditya'


from sa.model.product import Product
from sa import app, db
from sa.schema.product import ProductSchema
from flask import request, render_template
from  sqlalchemy.sql.expression import func


@app.route('/product/list', methods=['GET'])
def product_list():
    args = request.args.to_dict()
    args.pop('page', None)
    args.pop('per_page', None)
    per_page = int(request.args.get('per_page', 10))
    page = int(request.args.get('page', 1))
    products = Product.query.filter_by(**args).offset((page - 1) * per_page).limit(per_page).all()
    data = ProductSchema(many=True).dump(products)

    return render_template('product_list.html', hotel=data, per_page=per_page, page=page)


@app.route('/home', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/admin', methods=['GET'])
def admin():
    return render_template('admin.html')


