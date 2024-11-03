import React from 'react';
import '../../public/assets/login_register.css';
import { Link } from 'react-router-dom';

export class LoginPage extends React.Component {
    componentDidMount() {
        document.body.classList.add('login-page');
    }

    componentWillUnmount() {
        document.body.classList.remove('login-page');
    }
    render() {
        return (
            <div className = "LoginContainer">
                <div className = "loginForm"> 
                    <div className = "loginTitle">Login</div>
                    <div className = "loginUsername">
                        <label>Username: </label>
                        <input type = "text" className = "loginInput" placeholder = "Username..."></input>
                    </div>
                    <div className = "loginPassword">
                        <label>Password: </label>
                        <input type = "password" className = "loginInput" placeholder = "Password..."></input>
                    </div>
                    <button className = "loginButton">Login</button>
                    <div className = "loginRegisterLink">
                        <Link to="/Register">
                             Don't have an account? Register here!
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;