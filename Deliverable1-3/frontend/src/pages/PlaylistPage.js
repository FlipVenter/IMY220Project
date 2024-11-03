import React, { Component } from 'react';
import Cookies from 'js-cookie';
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import '../../public/assets/general.css'; // Ensure you import your CSS file
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

        // Ensure the element with ID 'containing' exists
        const containingDiv = document.getElementById("containingDiv");
        if (containingDiv) {
            containingDiv.style.backgroundColor = "black";
            containingDiv.style.backgroundImage = 'url(/assets/images/homePage.png)';
            containingDiv.style.backgroundRepeat = 'no-repeat';
            containingDiv.style.backgroundPosition = 'center center';
            containingDiv.style.backgroundAttachment = 'fixed';
        }
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
                hasComments: data.comments && data.comments.length > 0,
                editable: false
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
        const username = Cookies.get('username');
        const newComment = `${username}: ${this.state.comment}`;
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

    editPlaylist = () => {
        let editButton = document.getElementById("editButton");
        if (this.state.editable) {
            editButton.innerHTML = "Edit";
            this.updatePlaylist();
        } else {
            editButton.innerHTML = "Save";
        }
    }

    updatePlaylist = async () => {
        const playlistName = this.state.name;
        const { name, description, img } = this.state;

        try {
            const response = await fetch(`/api/playlists/${playlistName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, img })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Playlist updated successfully:', data);
        } catch (error) {
            console.error('Error updating playlist:', error);
        }
    }

    render() {
        return (
            <div className="PlaylistContainer">
                <div className = "playlistInfoContainer">
                    {/* <form> */}
                        <img className="playlistImage" src={this.state.img} alt="playlist" />
                        <div className='PlaylistDetailsContainer'>
                            <div>
                                <input 
                                    className="playlistTitle"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    name = "name"
                                    disabled={!this.state.ownPlaylist}  
                                    />
                            </div>
                            <div>
                                <label>Created by:</label>
                                <input 
                                    className="playlistAuthor"
                                    value = {this.state.author}
                                    onChange={this.handleChange}
                                    name = "author"
                                    />
                                
                            </div>
                            <div>
                                <input 
                                    className="playlistDescription"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    name = "description"
                                    />
                            </div>
                        </div>
                        <div className = "buttonsContainer">
                            <div className = "row">
                                {this.state.ownPlaylist && <button onClick = {this.editPlaylist} id = "editButton" className='editPlaylistButton'>Edit</button>}
                                <button className='addSongButton'>Add Songs</button>
                                {!this.state.ownPlaylist && <button  onClick={this.addFriend} className='addFriendButton'>Add Friend</button>}   
                            </div>
                        </div>
                    {/* </form> */}
                </div>
                <div className="playlistSongs">
                    {this.state.songs.map((song, index) => (
                        <PlaylistSongs key={index} _id={song} />
                    ))}
                </div>
                
                 {/* show comments */}
                <div className = "playlistCommentsContainer">
                    <div className='userCommentsContainer'>
                        {!this.state.hasComments && <div>No comments yet</div>}
                        {this.state.hasComments && <div>
                            {this.state.comments.map((comment, index) => (
                                <PlaylistComments key={index} comment={comment} />
                            ))}
                        </div>}
                    </div>
                    <div className = "commentForm">
                        <form  onSubmit={this.handleCommentSubmit}>
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
            </div>
        );
    }
}

export default PlaylistPage;