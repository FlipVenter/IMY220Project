import React from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/home.css'; // Ensure you import your CSS file
import { Playlists } from './Playlists';

const playlists = [
    { title: "chill vibes", author: "emma stone", description: "songs to relax and unwind", image: "/assets/images/image.png"},
    { title: "workout mix", author: "james miller", description: "upbeat tunes to keep you motivated", image: "/assets/images/image.png"},
    { title: "study beats", author: "sarah brown", description: "instrumental music for focus and concentration", image: "/assets/images/image.png"},
    { title: "road trip playlist", author: "michael green", description: "songs for a fun and memorable road trip", image: "/assets/images/image.png"},
    { title: "throwback jams", author: "linda johnson", description: "classic hits to bring back memories", image: "/assets/images/image.png"},
];

class PlaylistsBox extends React.Component {
    render() {
        return (
            <div className = "homePlaylistContainer">
                {playlists.map((playlist, index) => (
                    <Playlists key={index} {...playlist} />
                ))}
            </div>
        );
    }
}

export { PlaylistsBox };