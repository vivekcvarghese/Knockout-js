from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from cart import Cart
app = Flask(__name__)
api = Api(app)
CORS(app)


api.add_resource(Cart,"/items","/items/<string:id>")
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')