import React from "react";
import '../../public/assets/general.css';
import '../../public/assets/login_register.css';
import { Link } from 'react-router-dom';

class RegisterPage extends React.Component {
    render() {
        return (
            <div className = "LoginContainer">
                <div className = "loginForm"> 
                    <div className = "loginTitle">Register</div>
                    <div className = "loginUsername">
                        <label>Username: </label>
                        <input type = "text" className = "loginInput" placeholder = "Username..."></input>
                    </div>
                    <div className = "loginPassword">
                        <label>Password: </label>
                        <input type = "password" className = "loginInput" placeholder = "Password..."></input>
                    </div>
                    <button className = "loginButton">Register</button>
                    <div className = "loginRegisterLink">
                        <Link to="/Login">
                            Already have an account? Login here!
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export { RegisterPage };