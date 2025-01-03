from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Initialize SQLAlchemy and Bcrypt
db = SQLAlchemy()
bcrypt = Bcrypt()

# User model
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)  # Auto-incrementing ID
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    transactions = db.relationship("Transaction", back_populates="user")

    def __init__(self, username, password):
        self.username = username
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    user = db.relationship("User", back_populates="transactions")

    def __init__(self, user_id, amount, description):
        self.user_id = user_id
        self.amount = amount
        self.description = description


def get_all_users():
        try:
            users = User.query.all()  # Query all records from the 'users' table
            return users
        except Exception as e:
            print("Error fetching users:", e)
            return None
#CHange to user_id parameter instead.
def create_user_transaction(user_id, amount, description):
    user = User.query.filter_by(id=user_id).first()
    transaction = Transaction(user_id=user.id, amount=amount, description=description)
    db.session.add(transaction)
    db.session.commit()

def get_user_transaction(user_id):
    user = User.query.filter_by(id=user_id).first()
    allTransactions = []
    for transaction in user.transactions:
        allTransactions.append(transaction)
    
    return allTransactions



