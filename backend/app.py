from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data()
    return jsonify({"message": "Hello from Flask!"})

@app.route('/home', methods=['GET'])
def get_home():
    return "<h1> Welcome! </h1>"

if __name__ == '__main__':
    app.run(debug=True)