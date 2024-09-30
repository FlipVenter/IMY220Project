import React from 'react';
import '../../public/assets/playlist.css'; 
import '../../public/assets/general.css';
import { PlaylistSongs } from '../components/PlaylistSongs';

const songList = [
    {pic: "/assets/images/starboy.png", title: "Song 1", artist: "Artist 1"},
]

class PlaylistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistTitle: props.playlistTitle, 
            playlistImage: props.playlistImage, 
            playlistAuthor: props.playlistAuthor,
            playlistDescription: props.playlistDescription
        };
    }
    render() {
        return (
            <div>
                <div className="playlistTitle">License to chill</div>
                <img className = "playlistImage" src = "https://i.scdn.co/image/ab67706f00000003b3b3f3b3f3b3f3b3f3b3f3b3" alt = "playlist"></img>
                <div className="playlistDescription">A collection of songs to help you relax and unwind</div>
                <div className="playlistAuthor"> Spotify</div>
            </div>
        );
    }
}

export { PlaylistPage };