import React, { Component } from 'react'
import Player from '../Player/Player'

class Music extends Component {
    static defaultProps = {
        MusicName: '',
        ArtistName: '',
        AlbumName: '',
        ArtistID: 0,
        PreviewUrl: '',
        ImageUrl: '',
    }
    render() {
        const { props } = this;

        return (            
            <div className="row">
                        <div className="column1-4">
                            <img className="labelPreview" src={props.ImageUrl}></img>
                        </div>
                        <div className="column3-4 content">
                            <h2>{props.MusicName}</h2>
                            <h3>{props.ArtistName}</h3>
                            <span>{props.AlbumName}</span>
                            <Player idA={props.ArtistID} musicLink={props.PreviewUrl} />
                        </div>                    
            </div>  
        );
    }
}

export default Music;