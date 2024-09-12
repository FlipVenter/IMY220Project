import React from 'react';
import { FiltersBox } from '../components/FilterBox';
import { PlaylistsBox } from '../components/PlaylistsBox';

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