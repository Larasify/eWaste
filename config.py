import os

class Config(object):
    SECRET_KEY = 'some_key'
    SQLALCHEMY_DATABASE_URI = \
	'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
