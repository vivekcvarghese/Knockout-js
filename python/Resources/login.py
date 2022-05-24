from flask_restful import Resource
from flask import request
from Models.login_model import LoginModel
from flask_jwt_extended import create_access_token

class Login(Resource):

    def post(self):
        data=request.get_json()

        res = LoginModel.getcredentials(data["username"], data["password"])
        if res != None:
            access_token = create_access_token(identity = data["username"])
            return {"login":"Success", 
                    "username":res.username, 
                    "token": access_token
                   }

        return {"login":"Invalid credentials"}