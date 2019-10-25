from flask import Flask, jsonify, render_template
from flask_restful import Resource, Api, reqparse
from flask import Flask, url_for
from subprocess import call
from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId
from datetime import datetime
from bson.json_util import dumps
from flask_cors import CORS
import ast
import json
import hashlib
import os

app = Flask(__name__)
api = Api(app)
CORS(app)

client = MongoClient('mongodb://202.182.112.20:27017/')
db = client.sensible

sha = hashlib.new('sha')

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, dict):
            return o
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)

app.config['MONGO_URI'] = os.environ.get('DB')
app.json_encoder = JSONEncoder

@app.route("/hardware/create", methods=['GET'])
def hardware_create():
    try:
        parser = reqparse.RequestParser()
        parser.add_argument('hardware', type=str)
        parser.add_argument('index', type=str)
        parser.add_argument('data')
        args = parser.parse_args()

        sha.update(str(args["index"]).encode('utf-8'))
        private = sha.hexdigest()
        private = private[0:8]

        data = ast.literal_eval(args["data"])
        db.cardboard.insert({"hardware": args["hardware"], "index": args["index"], "private_code": private, "data": data})

        return jsonify({"hardware": args["hardware"], "index": args["index"], "private_code": private, "data": data})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route("/hardware/update", methods=['GET'])
def hardware_update():
    try:
        collection = db.cardboard

        parser = reqparse.RequestParser()
        parser.add_argument('hardware', type=str)
        parser.add_argument('index', type=str)
        parser.add_argument('data')
        parser.add_argument('private_code')
        args = parser.parse_args()

        find_private = {"private_code": args["private_code"]}
        data = ast.literal_eval(args["data"])
        new_data = {"$set" : {"hardware": args["hardware"], "index": args["index"], "private_code": args["private_code"], "data": data}}

        res = collection.update_one(find_private, new_data)
        return jsonify(res)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route("/hardware/find", methods=['GET'])
def hardware_find():
    try:
        collection = db.cardboard
        res = []
        results = collection.find()
        for i in results:
            res.append(i)
        return jsonify(res)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
