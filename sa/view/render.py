# -*- coding: utf-8 -*-
__author__ = 'aditya'


from sa.model.product import Product
from sa import app, db
from sa.schema.product import ProductSchema
from flask import request, render_template
from  sqlalchemy.sql.expression import func


@app.route('/product', methods=['GET'])
def product_list():
    
    return render_template('product_list.html')


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/admin/vibhu', methods=['GET'])
def admin():
    return render_template('admin.html')


