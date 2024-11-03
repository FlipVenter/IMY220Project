import React from 'react'
import '../../public/assets/profile.css';

class PlaylistComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
        };
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <div className="commentContainer">
                {this.state.comment}
            </div>
        );
    }
}   

export default PlaylistComments;