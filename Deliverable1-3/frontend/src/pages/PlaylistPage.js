import React, { Component } from 'react';
import Cookies from 'js-cookie';
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import PlaylistSongs from '../components/PlaylistSongs'; // Import the PlaylistSongs component
import PlaylistComments from '../components/PlaylistComments'; // Import the PlaylistComments component

class PlaylistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            img: '',
            songs: [],
            author: '',
            ownPlaylist: false,
            comments: [],
            comment: '', // Add comment to state
            hasComments: false // Add hasComments to state
        };
    }

    componentDidMount() {
        this.fetchPlaylistData();
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if the author has been updated
        if (prevState.author !== this.state.author) {
            const username = Cookies.get('username');
            if (username === this.state.author) {
                this.setState({ ownPlaylist: true });
                console.log("User owns this playlist");
            }
        }
    }

    fetchPlaylistData = async () => {
        // Get currentPlaylist from cookies
        const playlistName = Cookies.get('currentPlaylist');
        console.log(`Fetching data for playlist: ${playlistName}`); // Debugging statement

        // Use that to fetch the playlist data
        try {
            const response = await fetch(`/api/playlists/name/${playlistName}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched playlist data:', data); // Debugging statement
            this.setState({
                name: data.name,
                description: data.description,
                img: data.img,
                songs: data.songs || [], 
                author: data.author,
                comments: data.comments || [],
                hasComments: data.comments && data.comments.length > 0
            });

            console.log("data.songs", data.songs);
            const username = Cookies.get('username');

            if (username === this.state.author) {
                this.setState({ ownPlaylist: true });
                console.log("User owns this playlist");
            }
        } catch (error) {
            console.error("Error fetching playlist data:", error);
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleCommentSubmit = async (event) => {
        event.preventDefault();
        const newComment = `${Cookies.get('username')}: ${this.state.comment}`;
        const playlistName = this.state.name;

        try {
            const response = await fetch(`/api/playlists/${playlistName}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: newComment })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Comment added successfully:', data);

            // Update state with the new comment
            this.setState(prevState => ({
                comments: [...prevState.comments, newComment],
                comment: '', // Clear the input field
                hasComments: true
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }

    addFriend = async () => {
        // add author of playlist to user's friends list
        const username = Cookies.get('username');

        try {
            const response = await fetch(`/api/users/${username}/friends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friend: this.state.author })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Added friend:', data); // Debugging statement
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }

    render() {
        return (
            <div className="PlaylistContainer">
                <div className="playlistTitle">{this.state.name}</div>
                <img className="playlistImage" src={this.state.img} alt="playlist" />
                <div className="playlistDescription">{this.state.description}</div>
                <div className="playlistAuthor">Created by: {this.state.author}</div>
                <button className='addSongButton'>Add Songs</button>
                {this.state.ownPlaylist && <button className='editPlaylistButton'>Edit</button>}
                {!this.state.ownPlaylist && <button onClick={this.addFriend} className='addFriendButton'>Add Friend</button>}
                <div className="playlistSongs">
                    {this.state.songs.map((song, index) => (
                        <PlaylistSongs key={index} _id={song} />
                    ))}
                </div>
                
                {/* show comments */}
                <div className="playlistComments">
                    {!this.state.hasComments && <div>No comments yet</div>}
                    {this.state.hasComments && <div>
                        {this.state.comments.map((comment, index) => (
                            <PlaylistComments key={index} comment={comment} />
                        ))}
                    </div>}
                    <form onSubmit={this.handleCommentSubmit}>
                        <input 
                            type="text" 
                            className="commentInput" 
                            placeholder="Add a comment..." 
                            name="comment" 
                            value={this.state.comment} 
                            onChange={this.handleChange} 
                        />
                        <button className="commentButton">Comment</button>
                    </form>

                </div>
            </div>
        );
    }
}

export default PlaylistPage;