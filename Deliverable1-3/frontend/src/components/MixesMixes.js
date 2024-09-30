import React, { Component } from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

class MixesMixes extends Component {
    constructor(props) {
        super(props); // Call the constructor of the parent class
        this.state = {
            title: props.title, 
            author: props.author,
            description: props.description,
            image: props.image
        };
    }
    render() {
        return (
            <div className = "profileMixes">
                <p className = "profileMixesTitle"> {this.state.title}</p>
                <p className = "profileMixesAuthor"> {this.state.author}</p>
                <img className = "profileMixesImage" src ='/assets/images/image.png' alt = "playlist" ></img>
                <button className = "mixesButton">
                    <Link to="/Playlist" style={{ padding: '0px', margin: '0px' }}>View</Link>
                </button>
                <button className='editPlaylist'>Edit</button>
            </div>
        );
    }
}

export { MixesMixes };