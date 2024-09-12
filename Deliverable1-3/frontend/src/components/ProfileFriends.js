import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import { FriendsList } from './FriendsList'; // Ensure the path and import are correct

const friends = [
    { name: "John Doe", profilePic: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png" },
    { name: "Jane Smith", profilePic: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png" },
    { name: "Alice Johnson", profilePic: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png" },
    { name: "Bob Brown", profilePic: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png" },
];

class ProfileFriends extends React.Component {
    render() {
        return (
            <div className="profileFriendsBox">
                <div className="profileFriendsTitle">Friends</div>
                <div className="friendsListBox">
                    {friends.map((friend, index) => (
                        <FriendsList key={index} {...friend} />
                    ))}
                </div>
            </div>
        );
    }
}

export { ProfileFriends };