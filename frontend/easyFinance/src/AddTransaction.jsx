import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const addTransactions = ({user}) => {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [tranAmount, setAmount] = useState("");
    const [tranType, setType] = useState("");

    const createTrans = async (e) => {
        e.preventDefault();

        try{
            const user_id = user?.id;
            const response = await fetch("http://127.0.0.1:5000/auth/login/transaction/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user_id, amount: tranAmount, type: tranType }),
            });

            const data = await response.json();

            if(response.ok){
                setMessage("Transation added sucessfully");
                setAmount("");
                setType("");
            }else{
                setMessage("An error ocurred while adding transaction");
            }


        }catch (error){
            console.error("An Error has ocurred:", error);

        }



    }

    const showTransactions = (e) => {
        e.preventDefault();
        navigate("/transactions");
    }

        

    return (
        <div>
            <h1> WELCOME </h1>
            <h5> Type the amount and type of transaction, then click the button to add transaction</h5>

            <form onSubmit={createTrans}>
                <input
                type="text"
                placeholder="amount"
                value={tranAmount}
                onChange={(e) => setAmount(e.target.value)}
                />
                <input
                type="text"
                placeholder="type"
                value={tranType}
                onChange={(e) => setType(e.target.value)}
                />
                <button type="submit">Create Transaction</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={showTransactions}> Show Transactions</button>
        </div>
    );

};

export default addTransactions;