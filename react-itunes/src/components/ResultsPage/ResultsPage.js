import React, { Component } from 'react'
import Music from '../Music/Music'
import axios from 'axios'

import './ResultsPage.scss'

class ResultsPage extends Component {
    state = {
        musics: []
    }
    
    constructor(props) {
        super(props);

        this.Search = this.Search.bind(this);
        this.OpenArtistPage = this.OpenArtistPage.bind(this);
    }

    Search(event) {
        if(event.keyCode == 13) {
            let term = event.target.value;          

            if(term.length >= 3) {
                axios.defaults.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': 0,
                    'Accept': 'application/json',
                };

                axios.post(`https://itunes.apple.com/search?term=${term}`)
                .then(res => {                    
                    const musics = res.data.results;                    
                    this.setState({ musics });
                });
            }
        }       
    }

    OpenArtistPage() {

    }

    render() {
        return (
            <div>
                <h1>React iTunes - By Jefferson Mello Olynyki</h1>
                
                <div className="card">
                    <input onKeyDown={this.Search} className="searchInput" placeholder="Pesquisar" />
                    <hr />
                </div>

                <div className="card">
                {
                    this.state.musics.map(music => <Music PreviewUrl={music.previewUrl} ImageUrl={music.artworkUrl100} ArtistID={music.artistId} ArtistName={music.artistName} MusicName={music.trackName} AlbumName={music.collectionName} />)
                }                                      
                </div>
            </div>
        );
    }
}

export default ResultsPage;