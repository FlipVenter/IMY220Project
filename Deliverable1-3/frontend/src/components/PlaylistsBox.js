import React from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/home.css'; // Ensure you import your CSS file
import { Playlists } from './Playlists';

const playlists = [
    { title: "chillvibes", author: "emma stone", description: "songs to relax and unwind", image: "/assets/images/image.png"},
    { title: "workoutmix", author: "james miller", description: "upbeat tunes to keep you motivated", image: "/assets/images/image.png"},
    { title: "studybeats", author: "sarah brown", description: "instrumental music for focus and concentration", image: "/assets/images/image.png"},
    { title: "roadtripplaylist", author: "michael green", description: "songs for a fun and memorable road trip", image: "/assets/images/image.png"},
    { title: "throwbackjams", author: "linda johnson", description: "classic hits to bring back memories", image: "/assets/images/image.png"},
];

class PlaylistsBox extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            playlists: [],
            error: false
        };
    }

    componentDidMount() {
        this.setState({ playlists });
    }
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