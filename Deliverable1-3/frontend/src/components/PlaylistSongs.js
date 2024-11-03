import React from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/playlist.css'; // Ensure you import your CSS file

class PlaylistSongs extends React.Component {
    constructor(props) {
        super(props); // Call the constructor of the parent class
        this.state = {
            _id: props._id,
            title: props.title,
            pic: props.pic,
            artist: props.artist,
        };
    }

    componentDidMount () {
        // this.fetchSongData();
    }

    fetchSongData = async () => {
        //fetch song data based on the song _id in the state
        try {
            const response = await fetch(`/api/songs/${this.state._id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched song data:', data); // Debugging statement
            this.setState({
                title: data.title,
                pic: data.pic,
                artist: data.artist
            }, () => {
                // Callback to ensure state is updated
                console.log("state after setState:", this.state); 
            });
        } catch (error) {
            console.error('Error fetching song:', error);
        }

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

export default PlaylistSongs;