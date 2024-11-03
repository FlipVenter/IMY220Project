import React from 'react';
import Cookies from 'js-cookie';
import '../../public/assets/profile.css'; 

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            img: '',
            genre: '' // New state property for genre
        };
        this.handleChange = this.handleChange.bind(this);
        this.createPlaylsitRequest = this.createPlaylsitRequest.bind(this);
    }

    // Handle input changes
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // Get username from cookies and set it as the author when requesting server to create a playlist
    createPlaylsitRequest(event) {
        event.preventDefault();
        const author = Cookies.get('username');
        const { name, description, img, genre } = this.state;

        if (!name || !description || !img || !genre || !author) {
            console.error('All fields are required');
            return;
        }

        const data = { name, description, img, genre, author };

        fetch('/api/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Playlist created successfully:', data);
            // Handle success (e.g., redirect or show a success message)
            this.props.hideCreatePlaylist(); // Hide the form after successful creation
        })
        .catch(error => {
            console.error('Error creating playlist:', error);
            // Handle error (e.g., show an error message)
        });
    }

    render() {
        return (
            <form onSubmit={this.createPlaylsitRequest}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="img">Image:</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={this.state.img}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <select
                        id="genre"
                        name="genre"
                        value={this.state.genre}
                        onChange={this.handleChange}
                        required
                    >
                        <option value="">Select a genre</option>
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                        <option value="jazz">Jazz</option>
                        <option value="classical">Classical</option>
                        <option value="hiphop">Hip-Hop</option>
                        <option value="electronic">Electronic</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={this.props.hideCreatePlaylist}>Cancel</button>
            </form>
        );
    }
}

export { CreatePlaylist };