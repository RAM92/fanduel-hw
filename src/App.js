import React from 'react';
import GuessCount from './GuessCount'
import PlayerPreview from './PlayerPreview'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      players: [],
      playerAOffset: 0,
      playerBOffset: 1,
    };
  }

  componentDidMount() {
    fetch('/Player.json')
    .then(response => response.json())
    .then(data => {
      this.setState({
        players: data.players,
        isLoaded: true
      });
    });
  }

  loadNewPlayers() {
    const { playerAOffset, playerBOffset} = this.state
    this.setState({
      playerAOffset: playerAOffset + 2,
      playerBOffset: playerBOffset + 2,
    });
  }

  render () {
    return !this.state.isLoaded ? (<div>Loading...</div>) :
    (
      <div className="App">
        Select player with highest FPPG
        <GuessCount value={123} />
        <div className="players">
          <PlayerPreview value={this.state.players[this.state.playerAOffset]}/>
          <PlayerPreview value={this.state.players[this.state.playerBOffset]}/>
        </div>
        <button onClick={() => this.loadNewPlayers()}>Load new</button>
      </div>
    );
  }

}

export default App;
