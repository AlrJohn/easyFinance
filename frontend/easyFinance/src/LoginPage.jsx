import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [path, setPath] = useState('login');
    const [message, setMessage] = useState("");
    

    const handleLogin = (e) => {
        e.preventDefault();
        registerUser(username, password, path)
        

    }

    const toggleForm = () => {

        setIsLogin(!isLogin);
    
        setPath(!isLogin ? "login" : "register");

      }

    const registerUser = async (username, password, path) => {
        try {
        const response = await fetch("https://aj.arjnhomenet.xyz/auth/" + path, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            if(path == "login"){
                onLogin(data);
                navigate("/transactions");
            }
            setMessage(data.message);
        } else {
            setMessage(data.error);
        }
        } catch (error) {
        onLogin("Failed. Please try again.");
        console.error("Error during process:", error);
        }
    };

    return (
        <div>
            <h2>{isLogin? "Login" : "Register"}</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isLogin? "Login" : "Register"}</button>

            </form>
            <p>
                {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                    <button onClick={toggleForm}>
                    {isLogin ? "Register here" : "Login here"}
                    </button>
            </p>
                
            {message && <p>{message}</p>}
        </div>

    )
};

export default LoginPage;