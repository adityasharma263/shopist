# -*- coding: utf-8 -*-
__author__ = 'aditya'
from flask_script import Command
from xlrd import open_workbook
from sa.model.product import Product
import os


class Excel(Command):
    def run(self):
        wb = open_workbook(os.path.realpath("") + '/products.xls')
        worksheet = wb.sheet_by_index(0)
        keys = [v.value for v in worksheet.row(0)]
        for row_number in range(worksheet.nrows):
            if row_number == 0:
                continue
            row_data = {}
            for col_number, cell in enumerate(worksheet.row(row_number)):
                row_data[keys[col_number]] = cell.value
            post = Product(**row_data)
            post.save()
