import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import '../../public/assets/home.css'; // Ensure you import your CSS file
import { Playlists } from './Playlists';
import { MixesMixes } from "./MixesMixes";


const playlists = [
    { title: "chill vibes", author: "emma stone", description: "songs to relax and unwind", image: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png"},
    { title: "workout mix", author: "james miller", description: "upbeat tunes to keep you motivated", image: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png"},
    { title: "study beats", author: "sarah brown", description: "instrumental music for focus and concentration", image: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png"},
    { title: "road trip playlist", author: "michael green", description: "songs for a fun and memorable road trip", image: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png"},
    { title: "throwback jams", author: "linda johnson", description: "classic hits to bring back memories", image: "https://github.com/FlipVenter/IMY220Project/blob/main/Deliverable1-3/frontend/public/assets/images/image.png"},
];

class ProfileMixes extends React.Component {
    render() {
        return (
            <div className = "profileMixesBox">
                <div className = "profileMixTitle">Mixes</div>
                <div className = "profileMixOwnership">
                    <select>
                        <option value = "own">Own</option>
                        <option value = "others">Other's</option>
                    </select>
                </div>
                <div className = "mixesMixesBox">
                    {playlists.map((mix, index) => (
                        <MixesMixes key={index} {...mix} />
                    ))}
                </div>
            </div>
        );
    };
}

export { ProfileMixes };