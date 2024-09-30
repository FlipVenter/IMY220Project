import React from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/playlist.css'; // Ensure you import your CSS file

class PlaylistSongs extends React.Component {
    constructor(props) {
        super(props); // Call the constructor of the parent class
        this.state = {
            title: props.title,
            pic: props.pic,
            artist: props.artist,
        };
    }
    render() {
        return (
            <div className="playlistSong">
                <img className="playlistSongImage" src={this.state.pic} alt="song"></img>
                <p className="playlistSongTitle"> {this.state.title}</p>
                <p className="playlistSongArtist"> {this.state.artist}</p>
                <button className='playlistAddToPlaylist'>Add</button>
            </div>
        );
    }
}

export { PlaylistSongs };