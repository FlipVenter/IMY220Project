import React from 'react';
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/home.css'; // Ensure you import your CSS file
import { Playlists } from './Playlists';

class PlaylistsBox extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            playlists: [],
            error: false
        };
    }

    componentDidMount() {
        fetch('/api/playlists')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ playlists: data });
                console.log('Fetched playlists:', data);
            })
            .catch(error => {
                this.setState({ error: true });
                console.error('Error fetching playlists:', error);
            });
    }

    render() {
        const { playlists, error } = this.state;
        if (error) {
            return <div>Error loading playlists</div>;
        }
        return (
            <div className="homePlaylistContainer">
                {playlists.map((playlist, index) => (
                    <Playlists key={index} {...playlist} />
                ))}
            </div>
        );
    }
}

export { PlaylistsBox };