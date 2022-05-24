from flask_restful import Resource
from flask import request
from Models.cart_model import CartModel
from flask_jwt_extended import jwt_required

items = []
class Cart(Resource):

    @jwt_required()
    def post(self):
        data=request.get_json()
        item=CartModel(data["id"], data["name"], data["price"])
        item.saveToDb()
        return {"response":"Product added successfully"}

    @jwt_required()
    def get(self):
        cart = CartModel.getCartItems()
        cart=[{"id":item.id,"name":item.name,"price":item.price} for item in cart]
        return cart
        
    @jwt_required()
    def delete(self,id):
        item=CartModel.getSingleItem(id)
        if item:
            item.delete()
            return {"message":"Product deleted successfully"}
        return{"message":"Product does not exist in cart"}
       