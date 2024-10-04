import React from "react";
import '../../public/assets/general.css';
import '../../public/assets/login_register.css';
import { Link } from 'react-router-dom';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            pronouns: '',
            bio: '',
            links: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    validateForm = () => {
        const { username, password, email, pronouns, bio, links } = this.state;
        const emptyFields = [];

        if (!username) emptyFields.push('Username');
        if (!password) emptyFields.push('Password');
        if (!email) emptyFields.push('Email');
        if (!pronouns) emptyFields.push('Pronouns');
        if (!bio) emptyFields.push('Bio');
        if (!links) emptyFields.push('Links');

        if (emptyFields.length > 0) {
            alert(`The following fields are empty: ${emptyFields.join(', ')}`);
            return false;
        }
        return true;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.validateForm()) {
            return;
        }

        const { username, password, email, pronouns, bio, links } = this.state;

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email, pronouns, bio, links })
        });

        if (response.ok) {
            // Handle successful registration (e.g., redirect to login page)
            console.log('Registration successful');
        } else {
            // Handle errors
            console.error('Registration failed');
        }
    }

    render() {
        return (
            <div className="LoginContainer">
                <form className="registerForm" onSubmit={this.handleSubmit}>
                    <div className="loginTitle">Register</div>
                    
                    <div className="registerInputContainer">
                        <label>Username: </label>
                        <input 
                            type="text" 
                            className="registerInput" 
                            placeholder="Username..." 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="registerInputContainer">
                        <label>Password: </label>
                        <input 
                            type="password" 
                            className="registerInput" 
                            placeholder="Password..." 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="registerInputContainer">
                        <label>Email: </label>
                        <input 
                            type="email" 
                            className="registerInput" 
                            placeholder="Email..." 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="registerInputContainer">
                        <label>Pronouns: </label>
                        <input 
                            type="text" 
                            className="registerInput" 
                            placeholder="Pronouns..." 
                            name="pronouns"
                            value={this.state.pronouns}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="registerInputContainer">
                        <label>Bio: </label>
                        <input 
                            type="text" 
                            className="registerInput" 
                            placeholder="Bio..." 
                            name="bio"
                            value={this.state.bio}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="registerInputContainer">
                        <label>Links: </label>
                        <input 
                            type="text" 
                            className="registerInput" 
                            placeholder="Links..." 
                            name="links"
                            value={this.state.links}
                            onChange={this.handleChange}
                        />
                    </div>

                    <button type="submit" className="registerButton">Register</button>
                </form>
            </div>
        );
    }
}

export { RegisterPage };