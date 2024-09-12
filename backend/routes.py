from app import app, db
from flask import request, jsonify
from models import Friend


# get all
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
            if field not in data:
                return jsonify({"error": f"missing fields"})

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
        return jsonify({"msg": "friend created "}), 201
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
            db.session.commit()
            return jsonify(friend.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
