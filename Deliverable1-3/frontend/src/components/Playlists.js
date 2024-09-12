import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
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
                <p className = "playlistTitle">{this.state.title}</p>
                <p className = "playlistAuthor">{this.state.author}</p>
                <p className = "playlistDescription">{this.state.description}</p>
                <img className = "playlistImage" src = {this.state.image} alt = "playlist"></img>
                <button className = "playlistButton">
                    <Link to="/Playlist" style={{ padding: '0px', margin: '0px' }}>View</Link>
                </button>
            </div>
        );
    }
}

export { Playlists };