# -*- coding: utf-8 -*-
from sa import db
from sa.model.base import Base


class Product(Base):
    __tablename__ = 'product'

    name = db.Column(db.String)
    image_url = db.Column(db.String, nullable=True)
    amazon_associates_url = db.Column(db.String, nullable=True)
    brand_name = db.Column(db.String, nullable=True)
    category = db.Column(db.String, nullable=True)
    price = db.Column(db.Integer, nullable=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __repr__(self):
        return '<name %r>' % self.name

