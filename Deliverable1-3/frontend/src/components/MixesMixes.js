import React, { Component } from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; 

class MixesMixes extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: props.name,
            img: props.img
        }
    }

    handleViewClick = () => {
        //set current playlistname in cookies
        Cookies.set('currentPlaylist', this.state.name);

        //redirect to playlist page
    }

    render() {

        // const { name, author, description, img } = this.props; // Destructure props

        return (
            <div className="profileMixes">
                <p className="profileMixesTitle">{this.state.name}</p>
                {/* <p className="profileMixesAuthor">{author}</p> */}
                <img className="profileMixesImage" src={this.state.img} alt="playlist" />
                {/* <p className="profileMixesDescription">{description}</p> */}
                <Link to="/playlist" className="mixesButton" onClick={this.handleViewClick}>View</Link>
            </div>
        );
    }
}

export { MixesMixes };