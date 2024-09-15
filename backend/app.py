from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import request, jsonify

# from models import Friend
import os

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False

db = SQLAlchemy(app)


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


with app.app_context():
    db.create_all()

frontend = os.path.join(os.getcwd(), "..", "frontend")
dist = os.path.join(frontend, "dist")


@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist, filename)


@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)


# add new
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        data = request.json
        required_fields = ["name", "post", "gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"missing fields"}), 400

        name = data.get("name")
        post = data.get("post")
        gender = data.get("gender")

        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None
        new_friend = Friend(name=name, post=post, gender=gender, img_url=img_url)
        db.session.add(new_friend)
        db.session.commit()
        return jsonify(new_friend.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# delete
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "no such friend"}), 404
        else:
            db.session.delete(friend)
            db.session.commit()
            return jsonify({"error": "friend deleted successfuly"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})


# update
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "no such friend"}), 404
        else:
            data = request.json

            friend.name = data.get("name", friend.name)
            friend.post = data.get("post", friend.post)

            if friend.gender == "male":
                friend.img_url = (
                    f"https://avatar.iran.liara.run/public/boy?username={friend.name}"
                )
            elif friend.gender == "female":
                friend.img_url = (
                    f"https://avatar.iran.liara.run/public/girl?username={friend.name}"
                )
            else:
                friend.img_url = None
            db.session.commit()
            return jsonify(friend.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# import routes


if __name__ == "__main__":
    app.run(debug=True)
