import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../public/assets/home.css'; 

class Playlists extends Component {
    constructor(props) {
        super(props); // Call the constructor of the parent class
        this.state = {
            name: props.name, 
            author: props.author,
            description: props.description,
            img: props.img,
            _id: props._id
        };
    }

    // Sample class method to update the name
    updatename(newname) {
        this.setState({ name: newname });
    }

    handleMoreClick = (id) => {
        console.log("Button clicked with id:", id);
        // Navigate to the PlaylistPage and load data related to the id
        // For example, you can use the id to fetch data from an API
        // navigate(`/PlaylistPage/${id}`);
    }

    render() {
        return (
            <div className="playlist">
                <img className="playlistimg" src={this.state.img} alt="playlist"></img>
                <div className="playlistInfo">
                    <div className="playlistname">{this.state.name}</div>
                    <div className="playlistAuthor">{this.state.author}</div>
                    <div className="playlistDescription">{this.state.description}</div>
                </div>
                <div className="buttonContainer">
                    <button 
                        id={this.state._id} 
                        className="playlistButton" 
                        onClick={() => this.handleMoreClick(this.state._id)}
                    >
                        <Link to={`/Playlist/${this.state._id}`} style={{ padding: '0px', margin: '0px' }}>View</Link>
                    </button>
                </div>
            </div>
        );
    }
}

export { Playlists };