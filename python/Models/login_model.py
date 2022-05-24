from db import db

class LoginModel(db.Model):

    __tablename__="login"
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80))
    password=db.Column(db.String(80))

    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password


    @classmethod
    def getcredentials(cls,username,password):

        res = db.session.query(LoginModel).filter(LoginModel.username == username, LoginModel.password == password).first()
        print (username, password)
        if res != None:
            return res
        return None