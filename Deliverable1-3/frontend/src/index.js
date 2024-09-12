import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/HomePage';
import '../public/assets/general.css'; // Ensure you import your CSS file
import { Footer } from './components/footer';
import { PlaylistPage } from './pages/PlaylistPage';
import { SplashPage } from './pages/SplashPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const App = () => {
    return (
      <div style = {{margin: "0px", padding: "0px", height: "100vh", width: "100vw"}}>
        <Router>
            <nav className = "topRibbon">
              <div>
                <Link to="/Splash" style={{ padding: '0px', margin: '0px' }}>
                  <img className = "mixTape" src = "/assets/images/MixTape.png" alt="MixTape Title"/>
                </Link>
              </div>
              <div>
                <Link to="/" style={{ padding: '0px', margin: '0px' }}>Home</Link>
              </div>
              <div>
                <Link to="/Profile" style={{ padding: '0px', margin: '0px' }}>Profile</Link>
              </div>
              <div>
                <Link to="/Register" style={{ padding: '0px', margin: '0px' }}>Register</Link>
              </div>
            </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Playlist" element={<PlaylistPage />} />
            <Route path="/Splash" element={<SplashPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
          </Routes>
        </Router>
        {/* <Footer /> */}
      </div>
    );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);