from flask import Flask, jsonify, render_template
from subprocess import call
from flask import Flask, url_for
from pymongo import MongoClient

app = Flask(__name__, static_url_path='/static')
app.secret_key = "devJS"

@app.route('/')

def hello_world():
    return render_template('index.html')

@app.route('/cardboard')
def cardBoard():
    return render_template('cardboard.html')

@app.route('/management')
def managementWeb():
    return render_template('management.html')

@app.route('/mongo', methods=['GET','POST'])
def mongoTest():
    client = MongoClient('mongodb://202.182.112.20:27017/')
    db = client.sensible
    collection = db.cardboard
    results = collection.find()
    client.close()
    return render_template('mongo.html', data=results)


if __name__ == '__main__':
    app.run(debug=True, port=8000)