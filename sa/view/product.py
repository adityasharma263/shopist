# -*- coding: utf-8 -*-

from sa.model.hotel import Product
from sa import app
from flask import jsonify, request
# from cta.schema.hotel import HotelSchema
# import datetime
#
#
# @app.route('/api/v1/hotel', methods=['GET', 'POST'])
# def hotel_api():
#     if request.method == 'GET':
#         args = request.args.to_dict()
#         args.pop('page', None)
#         args.pop('per_page', None)
#         page = int(request.args.get('page', 1))
#         per_page = int(request.args.get('per_page', 10))
#         hotels = Hotel.query.filter_by(**args).offset((page - 1) * per_page).limit(per_page).all()
#         result = HotelSchema(many=True).dump(hotels)
#         return jsonify({'result': {'hotel': result.data}, 'message': "Success", 'error': False})
#     else:
#         data = request.json
#         hotel = data['hotel']
#         hotel_obj = {
#         "id": hotel.get("id", None),
#         "name" : hotel.get("name", None),
#         "city" : hotel.get("city", None),
#         'rating' : hotel.get("rating", None),
#         "desc" : hotel.get("desc", None),
#         "address" : hotel.get("address", None),
#         "star" : hotel.get("star", None),
#         }
#         print(hotel_obj)
#         post = Hotel(**hotel_obj)
#         post.save()
