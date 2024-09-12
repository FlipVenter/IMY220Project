import React from 'react';
import { FiltersBox } from '../components/FilterBox';
import { PlaylistsBox } from '../components/PlaylistsBox';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/home.css'; // Ensure you import your CSS file

class HomePage extends React.Component {
    render() {
        return (
            <div className = "generalGrid">
                <FiltersBox />
                <PlaylistsBox />
            </div>
        );
    }
}

export { HomePage };