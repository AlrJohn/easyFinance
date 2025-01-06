import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [path, setPath] = useState('login');
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        registerUser(username, password, path)
        

    }

    const toggleForm = () => {
        document.querySelector( "#register-login input:first-of-type").focus();
        setIsLogin(!isLogin);
        
        setPath(!isLogin ? "login" : "register");
        
        

    }

    const registerNewUser = (e)=>{
        if( confirmPassword!== password ){
            e.preventDefault();
            document.getElementById( "p-message-errorMessage" ).style.display = "block";
            document.getElementById( "input-password-register_password" ).style.borderColor = "red";
            document.getElementById( "input-password-register_confirm_password" ).style.borderColor = "red";
            document.getElementById( "div-container-register_password" ).style.color = 'red';
            document.getElementById( "div-container-register_confirm_password" ).style.color = 'red';
        }
        else{
            document.getElementById( "p-message-errorMessage" ).style.display = "none";
            document.getElementById( "input-password-register_password" ).style.borderColor = "black";
            document.getElementById( "input-password-register_confirm_password" ).style.borderColor = "black";
            document.getElementById( "div-container-register_password" ).style.color = 'white';
            document.getElementById( "div-container-register_confirm_password" ).style.color = 'white';
            console.log("New User Registered");
            setIsLogin( !isLogin);
        }
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


    // if( !isLogin )
    //     return(
    //         <div id = "div-container-holds_form">
    //             <h2>Register</h2>
                
    //             <form id="register-login" onSubmit={registerNewUser}>
                    
    //                 <div className="div-container-holds_input">
                        
    //                     <input
    //                         autoComplete="off"
    //                         required
    //                         type = "email"
    //                         id = "input-email-register_email"
    //                         placeholder = "example.gmail"
    //                         value = {email}
    //                         onChange = { (e) => setEmail( e.target.value )}
    //                     />
    //                 </div>
    //                 <div className="div-container-holds_input">
                        
    //                     <input
    //                         autoComplete="off"
    //                         required
    //                         type = "text"
    //                         id = "input-text-register_username"
    //                         placeholder = "username"
    //                         value = {username}
    //                         onChange = { (e) => setUsername( e.target.value )}
    //                     />
    //                 </div>
    //                 <div className="div-container-holds_input" id = "div-container-register_password">
                       
    //                     <input
    //                         autoComplete="off"
    //                         required
    //                         type = "password"
    //                         id = "input-password-register_password"
    //                         placeholder = "password"
    //                         value = {password}
    //                         onChange = { (e) => setPassword( e.target.value )}
    //                     />
    //                 </div>
    //                 <div className="div-container-holds_input" id = "div-container-register_confirm_password">
                        
    //                     <input
    //                         autoComplete="off"
    //                         required
    //                         type = "password"
    //                         id = "input-password-register_confirm_password"
    //                         placeholder = "password"
    //                         value = {confirmPassword}
    //                         onChange={ (e) => setConfirmPassword( e.target.value )}                        
    //                     />
    //                 </div>
    //                 <button
    //                     id = "button-submit-submitForm"
    //                     type = "submit"
                        
                        
    //                 >Register</button>
    //             </form>
    //             <p id = "p-message-errorMessage" >Password do not match</p>
    //             <p>
    //                 Already have an account?
    //                 <button
    //                     id = "button-toggle-toggleForm"
    //                     onClick = {toggleForm}
    //                 >Login Here</button>
    //             </p>
    //             {message && <p>{message}</p>}
    //         </div>

    //     )

    return (
        <div id= "div-container-holds_form">
            <h2>{isLogin? "Login" : "Register"}</h2>
            <form onSubmit={handleLogin} id ="register-login">
                <div className="div-container-holds_input">
                
                    <input
                        autoComplete="off"
                        type="text"
                        required
                        id = "input-text-username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="div-container-holds_input">
                    
                    <input
                        autoComplete="off"
                        required
                        type="password"
                        id = "input-password-password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    id = "button-submit-submitForm"
                    type="submit"
                >{isLogin? "Login" : "Register"}</button>

            </form>
            <p>
                {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                    <button onClick={toggleForm}
                    id="button-toggle-toggleForm">
                    {isLogin ? "Register here" : "Login here"}
                    </button>
            </p>
                
            {message && <p>{message}</p>}
        </div>

    )
};

export default LoginPage;