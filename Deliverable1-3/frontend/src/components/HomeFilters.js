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
                <input className = "searchBar" type = "text" placeholder = "Search..."></input>
                <div className = "filterBox">
                    <select>
                        <option value = "playlists">Playlists</option>
                        <option value = "songs">Songs</option>                   
                        <option value = "songs">Songs</option>
                        <option value = "songs">Songs</option>
                        <option value = "songs">Songs</option>
                        <option value = "songs">Songs</option>
                        <option value = "songs">Songs</option>
                        <option value = "songs">Songs</option>
                        <option value = "songs">Songs</option>
                        <option value = "songs">Songs</option>
                    </select>
                </div>
            </div>
        );
    }
}

export { FiltersBox };