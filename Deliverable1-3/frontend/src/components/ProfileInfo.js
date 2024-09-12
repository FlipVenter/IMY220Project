import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file

class ProfileInfo extends React.Component {
    render() {
        return (
            <div className = "profileInfoBox">
                <div className = "profilePhoto"></div>
                <div className = "profileName">John Doe</div>
                <div className = "profilePronouns">He/him</div>
                <div className = "profileUsername">Flip</div>
                <div className = "profileBio">
                    San Francisco, CA
                    <br />  
                    25
                    <br />
                    studying at UP
                </div>
                <div className = "profileLinks">//onlyfnas</div>
                <button className = "profileEditButton">Edit</button>
            </div>
        );
    };
}

export { ProfileInfo };