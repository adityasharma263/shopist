"""empty message

Revision ID: 94d4b3b3b6c9
Revises: 7312e43f4dbe
Create Date: 2018-06-26 16:43:27.514092

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '94d4b3b3b6c9'
down_revision = '7312e43f4dbe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('amazon_price', sa.Integer(), nullable=True))
    op.add_column('product', sa.Column('brand', sa.String(), nullable=True))
    op.add_column('product', sa.Column('flipkart_associates_url', sa.String(), nullable=True))
    op.add_column('product', sa.Column('flipkart_price', sa.Integer(), nullable=True))
    op.add_column('product', sa.Column('snapdeal_associates_url', sa.String(), nullable=True))
    op.add_column('product', sa.Column('snapdeal_price', sa.Integer(), nullable=True))
    op.drop_column('product', 'brand_name')
    op.drop_column('product', 'price')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('price', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('product', sa.Column('brand_name', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('product', 'snapdeal_price')
    op.drop_column('product', 'snapdeal_associates_url')
    op.drop_column('product', 'flipkart_price')
    op.drop_column('product', 'flipkart_associates_url')
    op.drop_column('product', 'brand')
    op.drop_column('product', 'amazon_price')
    # ### end Alembic commands ###
