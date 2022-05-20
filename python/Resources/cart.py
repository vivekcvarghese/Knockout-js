from flask_restful import Resource
from flask import request
from Models.cart_model import CartModel

items = []
class Cart(Resource):

    def post(self):
        data=request.get_json()
        item=CartModel(data["id"], data["name"], data["price"])
        item.saveToDb()
        return {"response":"Product added successfully"}

    def get(self):
        cart = CartModel.getCartItems()
        cart=[{"id":item.id,"name":item.name,"price":item.price} for item in cart]
        return cart

    def delete(self,id):
        item=CartModel.getSingleItem(id)
        if item:
            item.delete()
            return {"message":"Product deleted successfully"}
        return{"message":"Product does not exist in cart"}
       