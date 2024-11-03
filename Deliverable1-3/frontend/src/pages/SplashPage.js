import React from 'react';
import '../../public/assets/general.css'; 
import '../../public/assets/splash.css';
import { Link } from 'react-router-dom';

export class SplashPage extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        let thisPage = document.getElementById("root");
        thisPage.style.backgroundImage = "url('frontend/public/assets/images/splashPage.png')";
    }

    render() {
        return (
            <div className = "generalGrid">
                <div className = "Splash">
                    <div className = "SplashCenterContainer">
                        <img className = "SplashTitle" src = "/assets/images/MixTape.png" alt="MixTape Title"/>
                        <Link to="/Login">
                            <img className = "SplashLogin" src = "/assets/images/Login.png" alt="Login"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashPage;