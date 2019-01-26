import React, { Component } from 'react'
import Album from '../Album/Album'
import axios from 'axios'

class Artist extends Component {
    static defaultProps = {
        ArtistId: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            Artist: {},
            Albuns: []
        }

        this.GetArtist = this.GetArtist.bind(this);
        this.GetLastAlbuns = this.GetLastAlbuns.bind(this);

        if(this.props.ArtistId != 0)
            this.GetArtist();
    }

    componentDidMount() {
        axios.defaults.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
            'Accept': 'application/json',
        };
    }

    GetArtist() {        
        axios.post(`https://itunes.apple.com/lookup?id=${this.props.ArtistId}`)
        .then(res => {                    
            const Artist = res.data.results[0];                    
            this.setState({ Artist });  
            this.GetLastAlbuns();
        });
    }

    GetLastAlbuns() {
        axios.post(`https://itunes.apple.com/lookup?id=${this.props.ArtistId}&entity=album&limit=3`)
        .then(res => {                    
            const Albuns = res.data.results;                    
            this.setState({ Albuns });
        });
    }

    render() {
        const { state } = this;
        return (
            <div>        
                <h1>{state.Artist.artistName} <br/> {state.Artist.primaryGenreName}</h1>
                <hr />
                <div className="container">
                <h1>Últimos Álbuns</h1>
                {
                    state.Albuns.map(f => <Album AlbumName={f.collectionName} AlbumImage={f.artworkUrl100} />)
                }
                </div>
            </div>
        );
    }
}

export default Artist;