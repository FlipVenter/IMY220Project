import React from 'react';
import '../../public/assets/playlist.css'; 
import '../../public/assets/general.css';
import { PlaylistSongs } from '../components/PlaylistSongs';

const songList = [
    {pic: "/assets/images/starboy.png", title: "Song 1", artist: "Artist 1"},
]

class PlaylistPage extends React.Component {
    render() {
        return (
            <div className = "PlaylistContainer">
                <div className="playlistTitle">License to chill</div>
                <img className = "playlistImage" src = "https://i.scdn.co/image/ab67706f00000003b3b3f3b3f3b3f3b3f3b3f3b3" alt = "playlist"></img>
                 <div className="playlistDescription">A collection of songs to help you relax and unwind</div>
                <div className="playlistAuthor">Created by: Spotify</div>
                <div className="playlistSongs">
                    {songList.map((song, index) => (
                            <PlaylistSongs key={index} {...song} />
                    ))}
                </div> 
            </div>
        );
    }
}

export { PlaylistPage };