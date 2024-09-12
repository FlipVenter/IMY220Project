import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file

class FriendsList extends React.Component {
    constructor(props) {
        super(props); // Call the constructor of the parent class
        this.state = {
            name: props.name, 
            profilePic: props.profilePic
        };
    }
    render() {
        return (
            <div className = "profileFriends">
                <img className = "profileFriendsImage" src = "/assets/images/profileImage.png" alt = "profile"></img>
                <p className = "profileFriendsName">{this.state.name}</p>
                <button className = "friendsButton">Visit</button>
            </div>
        );
    }
}

export { FriendsList };