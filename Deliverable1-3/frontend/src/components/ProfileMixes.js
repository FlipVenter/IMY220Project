import React from "react";
import '../../public/assets/general.css'; // Ensure you import your CSS file
import '../../public/assets/profile.css'; // Ensure you import your CSS file
import '../../public/assets/home.css'; // Ensure you import your CSS file
import { Playlist } from './HomePlaylist';
import { MixesMixes } from "./MixesMixes";
import { CreatePlaylist } from "./createPlaylist";
import Cookies from 'js-cookie';

class ProfileMixes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            showCreatePlaylist: false // New state property to track visibility of CreatePlaylist component
        };
        this.createPlaylistFunction = this.createPlaylistFunction.bind(this);
        this.hideCreatePlaylist = this.hideCreatePlaylist.bind(this);
    }

    componentDidMount() {
        const author = Cookies.get("username");
        // Fetch playlists with specific author
        fetch(`/api/playlists/${author}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ playlists: data });
                console.log('Playlists:', data);
            })
            .catch((error) => {
                console.error('Error fetching playlists:', error);
            });
    }

    createPlaylistFunction() {
        this.setState(prevState => ({ showCreatePlaylist: !prevState.showCreatePlaylist }));
    }

    hideCreatePlaylist() {
        this.setState({ showCreatePlaylist: false });
    }

    render() {
        return (
            <div className="profileMixesBox">
                <div className="profileFriendsTitle">Mixes</div>
                {/* <div className="profileMixOwnership">
                    <select>
                        <option value="own">Own</option>
                        <option value="others">Other's</option>
                    </select>
                </div> */}
                <div className="createPlaylistContainer ">
                    <button className="profileCreatePlaylist" onClick={this.createPlaylistFunction}>create</button>
                </div>
                {this.state.showCreatePlaylist && <CreatePlaylist hideCreatePlaylist={this.hideCreatePlaylist} />}
                <div className="mixesMixesBox">
                    {this.state.playlists.map((mix, index) => (
                        <MixesMixes key={index} {...mix} />
                    ))}
                </div>
            </div>
        );
    }
}

export { ProfileMixes };