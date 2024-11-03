import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import { FriendsList } from './FriendsList'; // Ensure the path and import are correct
import Cookies from 'js-cookie';

class ProfileFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch(`/api/users/${Cookies.get('username')}/friends`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const friends = await response.json();
            this.setState({ friends });
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }

    render() {
        return (
            <div className="profileFriendsBox">
                <div className="profileFriendsTitle">Friends</div>
                <div className="friendsListBox">
                    {this.state.friends.map((friend, index) => (
                        <FriendsList key={index} name={friend} />
                    ))}
                </div>
            </div>
        );
    }
}

export { ProfileFriends };