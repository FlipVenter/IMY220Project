import React from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/home.css'; // Ensure you import your CSS file

class FiltersBox extends React.Component {
    render() { //this class will be used for the filter options (playlists/song selector, search bar , filter box); 
        return (
            <div className = "homeFiltersContainer">
                <div className = "collectionSelector">
                    <select>
                        <option value = "playlists">Playlists</option>
                        <option value = "songs">Songs</option>
                    </select>
                </div>
                <div className = "searchBar">
                    <input type = "text" placeholder = "Search..."></input>
                </div>
                <div className = "filterBox">
                    <button>Filter</button>
                </div>
            </div>
        );
    }
}

export { FiltersBox };