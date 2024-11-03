import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file

class FriendsList extends React.Component {
    constructor(props) {
        super(props); // Call the constructor of the parent class
        this.state = {
            name: props.name, 
            img: ""
        };
    }

    componentDidMount() {
        fetch(`/api/users/${this.state.name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Read the response as text
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); // Attempt to parse the text as JSON
                    this.setState({ img: data.img });
                    console.log('User retrieved:', data);
                    console.log('this is the state: ', this.state); 
                } catch (error) {
                    throw new Error('Response is not valid JSON');
                }
            })
            .catch(error => {
                this.setState({ error: true });
                console.error('Error fetching user:', error);
            });
    }

    visitFriend() {
        
    }
    
    render() {
        return (
            <div className = "profileFriends">
                <img className = "profileFriendsImage" src = {this.state.img} alt = "profile"></img>
                <div className="nameContainer">
                    <p className = "profileFriendsName">{this.state.name}</p>
                </div>
                <div className="buttonContainer">
                    <button className = "friendsButton">Visit</button>
                </div>
            </div>
        );
    }
}

export { FriendsList };