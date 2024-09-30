import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../../public/assets/general.css';
import '../../public/assets/home.css'; 

class Playlists extends Component {
    constructor(props) {
        super(props); // Call the constructor of the parent class
        this.state = {
            title: props.title, 
            author: props.author,
            description: props.description,
            image: props.image
        };
    }

    // Sample class method to update the title
    updateTitle(newTitle) {
        this.setState({ title: newTitle });
    }

    handleMoreClick = () => {
        navigate('/PlaylistPage');
    }

    render() {
        return (
            <div className = "playlist">
                <img className = "playlistImage" src = {this.state.image} alt = "playlist"></img>
                <div>
                    <div className = "playlistTitle">{this.state.title}</div>
                    <div className = "playlistAuthor">{this.state.author}</div>
                    <div className = "playlistDescription">{this.state.description}</div>
                </div>
                <div className = "buttonContainer">
                    <button className = "playlistButton">
                        <Link to="/Playlist" style={{ padding: '0px', margin: '0px' }}>View</Link>
                    </button>
                </div>
            </div>
        );
    }
}

export { Playlists };