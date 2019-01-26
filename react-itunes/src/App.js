import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ResultsPage from './components/ResultsPage/ResultsPage';
import Artist from './components/Artist/Artist'

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
      <div>
        <Route exact path="/" component={this.Home} />
        <Route  path="/Artist/:id" component={this.Artist} />
      </div>
    </Router>        
      </div>
    );
  }

  Home() {
    return (<ResultsPage />);
  }

  Artist({ match }) {
    return (<Artist ArtistId={match.params.id} />);
  }
}

export default App;
