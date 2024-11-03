import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import Cookies from 'js-cookie';

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pronouns: '',
            bio: '',
            links: '',
            img: '',
            error: false,
            isEditable: false // New state property to track edit mode
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // Get the username from cookies
        const username = Cookies.get('username');
        
        // Fetch user data using the username
        fetch(`/api/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && typeof data === 'object') {
                    this.setState({
                        username: data.username,
                        pronouns: data.pronouns,
                        bio: data.bio,
                        links: data.links,
                        img: data.img
                    });
                } else {
                    throw new Error('Response is not valid JSON');
                }
            })
            .catch(error => {
                this.setState({ error: true });
                console.error('Error fetching user:', error);
            });
    }

    toggleEdit() {
        this.setState(prevState => ({ isEditable: !prevState.isEditable }));
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    saveProfileInfo = () => {
        const username = Cookies.get('username');
        const data = {
            username: this.state.username,
            pronouns: this.state.pronouns,
            bio: this.state.bio,
            links: this.state.links,
            img: this.state.img
        };
        fetch('/api/users/' + username, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    render() {
        return (
            <form className="profileInfoBox">
                <img className="profilePhoto" src={this.state.img} alt="Profile" />
                <input
                    className="profileName"
                    name="username"
                    value={this.state.username}
                    disabled={!this.state.isEditable}
                    onChange={this.handleChange}
                />
                <input
                    className="profilePronouns"
                    name="pronouns"
                    value={this.state.pronouns}
                    disabled={!this.state.isEditable}
                    onChange={this.handleChange}
                />
                <input
                    className="profileBio"
                    name="bio"
                    value={this.state.bio}
                    disabled={!this.state.isEditable}
                    onChange={this.handleChange}
                />
                <input
                    className="profileLinks"
                    name="links"
                    value={this.state.links}
                    disabled={!this.state.isEditable}
                    onChange={this.handleChange}
                />
                <button type="button" className="profileEditButton" onClick={this.toggleEdit}>
                    {this.state.isEditable ? 'Save' : 'Edit'}
                </button>
            </form>
        );
    }
}

export { ProfileInfo };