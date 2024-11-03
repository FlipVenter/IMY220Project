import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../../public/assets/home.css'; 
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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

    handleMoreClick = () => {
        //set current playlistname in cookies
        Cookies.set('currentPlaylist', this.state.name);
        // Redirect to playlist page
    }

    render() {
        return (
            <div className="playlist">
                <div className="imageContainer">
                    <img className="playlistimg" src={this.state.img} alt="playlist"></img>
                </div>
                <div className="playlistInfo">
                    <div className="playlistName">{this.state.name}</div>
                    <div className="playlistAuthor" style={{ color: '#474747', fontWeight: '500' , fontSize: '0.9em'}}>{this.state.author}</div>
                    <div className="playlistDescription" style={{ color: '#474747', fontWeight: '500' , fontSize: '0.9em' }}>{this.state.description}</div>
                </div>
                <div className="buttonContainer"> 
                    <Link to="/playlist"  
                        id={this.state._id} 
                        onClick={this.handleMoreClick}
                        style={{fontSize: '1.7em'}}
                        className="playlistButton"
                    >
                        View
                    </Link>
                </div>
            </div>
        );
    }
}

export { Playlists };