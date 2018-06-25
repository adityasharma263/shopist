# -*- coding: utf-8 -*-
from sa import db
from sa.model.base import Base


class Product(Base):
    __tablename__ = 'hotel'

    name = db.Column(db.String)


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __repr__(self):
        return '<name %r>' % self.name

