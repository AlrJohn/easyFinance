from flask import Blueprint, request, jsonify
from db import db, User, Transaction, get_user_transaction, create_user_transaction

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify({"message": "Login successful", "id" : user.id, "username" : user.username}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@auth.route('/login/transaction/create', methods=['POST'])
def create_transaction():
    transaction = request.json
    user_id = transaction.get('user_id')
    tran_amount = transaction.get('amount')
    tran_type = transaction.get('type')

    create_user_transaction(user_id , tran_amount, tran_type)

    return jsonify("Transaction added successfully"), 200


@auth.route('/login/get_transactions/<int:user_id>', methods=['GET'])
def get_transactions(user_id):
    transactions = get_user_transaction(user_id)
    if transactions:
        return jsonify([{"id" : transaction.id, "amount" : transaction.amount, "type" : transaction.description} for transaction in transactions])

    else:
        return jsonify({"id": 0, "amount" : "Error", "type" : "Error"}), 500
