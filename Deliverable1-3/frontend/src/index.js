import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import '../public/assets/general.css'; // Ensure you import your CSS file
import Cookies from 'js-cookie';

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      checkLoginStatus(); 
    }, []);

    const checkLoginStatus = async () => {
      if (Cookies.get("LoggedIn") !== "true") {
        navigate('/Splash'); 
      }
    };

    const handleLogout = () => {
      Cookies.set("LoggedIn", "false");
      navigate('/Splash');
    };

    const getBackgroundStyle = () => {
      switch (location.pathname) {
          case '/Splash':
              return { backgroundImage: 'url(/assets/images/splashPage.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center 70%', backgroundAttachment: 'fixed', backgroundSize: 'cover' };
          case '/':
              return { backgroundImage: 'url(/assets/images/homePage.png)',backgroundRepeat: 'no-repeat', backgroundPosition: 'center 70%', backgroundAttachment: 'fixed', backgroundSize: 'cover' };
          case '/Profile':
              return { backgroundImage: 'url(/assets/images/homePage.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundSize: 'cover' };
          case '/Playlist':
              return { backgroundImage: 'url(/assets/images/homePage.png)', backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundSize: 'cover' };
          case '/Login':
              return { backgroundImage: 'url(/assets/images/registerPage.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundSize: 'cover' };
          case '/Register':
              return { backgroundImage: 'url(/assets/images/registerPage.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundSize: 'cover' };
          default:
              return { background: 'white' };
      }
  };

    return (
      <div id = "containingDiv" style={{ ...getBackgroundStyle(),backgroundColor: 'black',  margin: "0px", padding: "0px", height: "100vh", width: "100vw" }}>
        {location.pathname !== '/Splash' && location.pathname !== '/Login' && location.pathname !== '/Register' && (
          <nav className="topRibbon">
            <div>
              <Link to="/Splash">
                <img className="mixTape" src="/assets/images/MixTape.png" alt="MixTape Title" />
              </Link>
            </div>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/Profile">Profile</Link>
            </div>
            <div>
              <button className = "navButton" onClick={handleLogout}>Log Out</button>
            </div>
          </nav>
        )}
        <Routes>
          <Route path="/Splash" element={<SplashPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Playlist" element={<PlaylistPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
        </Routes>
      </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);