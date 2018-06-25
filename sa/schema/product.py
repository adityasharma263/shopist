# -*- coding: utf-8 -*-

from sa.model.product import Product
from sa import ma


class ProductSchema(ma.ModelSchema):
    class Meta:
        model = Product
        exclude = ('updated_at', 'created_at')
