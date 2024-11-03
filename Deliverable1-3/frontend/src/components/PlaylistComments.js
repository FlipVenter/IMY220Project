import React from 'react'

class PlaylistComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
        };
    }

    componentDidMount() {
        this.fetchComments();
    }



    render() {
        return (
            <div className="commentContainer">
                
            </div>
        );
    }
}   

export default PlaylistComments;