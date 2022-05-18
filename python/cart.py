from flask_restful import Resource
from flask import request
items = []
class Cart(Resource):

    def post(self):

        data=request.get_json()
        items.append(data)
        return {"response":"Product added successfully"}

    def get(self):
        return items

    def delete(self,id):
      
        global items 
        items = [x for x in items if x['id'] != int(id)]
        return {"response":"Product deleted successfully"}