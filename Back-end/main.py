from flask import Flask, jsonify, render_template
from subprocess import call
from flask_socketio import SocketIO, send
from flask import Flask, url_for

app = Flask(__name__, static_url_path='/static')
app.secret_key = "devJS"

socket_io = SocketIO(app)

@app.route('/')

def hello_world():
    return render_template('index.html')

@app.route('/cardboard')
def cardBoard():
    return render_template('cardboard.html')

@app.route('/management')
def managementWeb():
    return render_template('management.html')


if __name__ == '__main__':
    socket_io.run(app, debug=True, port=8000)


print("Server ON")