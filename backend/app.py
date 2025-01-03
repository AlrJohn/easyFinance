from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from db import db, get_all_users, User, Transaction
from auth import auth

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth, url_prefix='/auth')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/home', methods=['GET'])
def get_home():
    return "<h1> Welcome! </h1>"

@app.route('/get_users', methods=['GET'])
def get_users(): #test
    users = get_all_users()  # Fetch all users from the database
    if users:
        return jsonify([{'id': user.id, 'username': user.username} for user in users])  # Return user data as JSON
    else:
        return jsonify({"message": "Error fetching users"}), 500

if __name__ == '__main__':
    app.run(debug=True)