import React, { Component } from 'react'

class Album extends Component {
    static defaultProps = {
        AlbumName: '',
        AlbumImage: ''
    }

    constructor(props) {
        super(props);


    }

    render() {
        const { props } = this;
        return (
            <div className="card"> 
                <img src={props.AlbumImage} />
                <h4><b>{props.AlbumName}</b></h4>                 
            </div>
        );
    }
}

export default Album;