from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from Resources.cart import Cart
from Resources.login import Login

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://root:root@localhost/products"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'PROD@123'
api = Api(app)
CORS(app)
api.add_resource(Cart,"/items","/items/<string:id>")
api.add_resource(Login,"/login")

if __name__ == '__main__':
    from db import db

    db.init_app(app)
    app.run(debug=True, host='0.0.0.0')