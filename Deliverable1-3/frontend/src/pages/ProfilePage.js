import React from 'react';
import { ProfileInfo } from '../components/ProfileInfo';
import { ProfileMixes } from '../components/ProfileMixes';
import { ProfileFriends } from '../components/ProfileFriends';
import '../../public/assets/general.css'; // Ensure you import your CSS file



class ProfilePage extends React.Component {
    render() {
        return (
            <div className = "generalGrid">
                <ProfileInfo />
                <ProfileMixes />
                <ProfileFriends />
            </div>
        );
    }
}

export { ProfilePage };