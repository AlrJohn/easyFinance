import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Transactions.css';

const TransactionsPage = ({ user, onSignOut}) => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`https://aj.arjnhomenet.xyz/auth/login/get_transactions/${user.id}`);
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

//Delete this function as well
const delUser = (e) =>{
  e.preventDefault();
  const del = async () =>{
    const response = await fetch(`https://aj.arjnhomenet.xyz/delete_user/${user.id}`, {
          method: "DELETE",
          headers: {
          "Content-Type": "application/json",
          },
      });

      const data = await response.json();
      
      if (response.ok) {
        onSignOut(null);
        navigate("/login");
      }else{
        console.log("unable to delete user");
      }
  }

  del();
}

  return (
    <div id="div-container-body">
        <button
          id = "button-sign_out-transtactions"
          onClick={signOut}
        >Sign out</button>
        
        
      <h2>{transactions.length != 0? user.username+"'s" : "NO"} Transactions</h2>
      <h3>Id = {user?.id? user.id : -1}</h3>
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
      {/* delete deluser button when not needed anymore */}
      <button onClick={delUser}>Delete User</button>
    </div>
  );
};

export default TransactionsPage;
