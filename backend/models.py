from app import db


class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    post = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "post": self.post,
            "gender": self.gender,
            "imgUrl": self.img_url,
        }
