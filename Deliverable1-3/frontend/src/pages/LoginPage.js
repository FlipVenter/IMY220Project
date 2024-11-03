import React from 'react';
import '../../public/assets/login_register.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        document.body.classList.add('login-page');
    }

    componentWillUnmount() {
        document.body.classList.remove('login-page');
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            Cookies.set('LoggedIn', 'true');
            Cookies.set('username', username);
            this.props.navigate('/');
        } else {
            alert('Login failed. Please check your username and password.');
        }
    }

    render() {
        return (
            <div className="LoginContainer">
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <div className="loginTitle">Login</div>
                    <div className="loginUsername">
                        <label>Username: </label>
                        <input
                            type="text"
                            className="loginInput"
                            placeholder="Username..."
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="loginPassword">
                        <label>Password: </label>
                        <input
                            type="password"
                            className="loginInput"
                            placeholder="Password..."
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="loginButton">Login</button>
                    <div className="loginRegisterLink">
                        <Link to="/Register">
                            Don't have an account? Register here!
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

const LoginPageWithNavigate = (props) => {
    const navigate = useNavigate();
    return <LoginPage {...props} navigate={navigate} />;
};

export default LoginPageWithNavigate;