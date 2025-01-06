import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Transactions.css';

const TransactionsPage = ({ user, onSignOut}) => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`http://localhost:5000/auth/login/get_transactions/${user.id}`);
      const data = await response.json();

      if (response.ok){
        setTransactions(data);
      }else{
        console.log("Error fetching. No transactions found!")
      }
    };

    if (user?.id) fetchTransactions();
  }, [user]);

const addTr = (e) =>{
    e.preventDefault();
    navigate("/add_transaction")
}

const signOut = (e) => {
    e.preventDefault();
    onSignOut(null);
    navigate("/login")
}

  return (
    <div id="div-container-body">
        <button
          id = "button-sign_out-transtactions"
          onClick={signOut}
        >Sign out</button>
        
        
      <h2>{transactions.length != 0? user.username+"'s" : "NO"} Transactions</h2>
      <div id="div-container-TransactionList">
        <ul>
          {transactions.length != 0? transactions.map((transaction) => (
            <li key={transaction.id}>
              Amount: ${transaction.amount} | Type: {transaction.type}
            </li>
          )) : "No Transactions to Show"}
        </ul>
      </div>
      <button onClick={addTr}> Add Transactions</button>
    </div>
  );
};

export default TransactionsPage;
