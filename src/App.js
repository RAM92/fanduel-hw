import React from 'react';
import GuessCount from './GuessCount'
import PlayerPreview from './Player'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      players: [],
      playerAOffset: 0,
      playerBOffset: 1
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
      })
  }

  playerA () {
      return this.state.players[this.state.playerAOffset];
  }
  playerB () {
    return this.state.players[this.state.playerBOffset];
  }
  render () {
    return !this.state.isLoaded ? (<div>Loading...</div>) :
    (
      <div className="App">
        Select player with highest FPPG
        <GuessCount value={123} />
        <div>
          <PlayerPreview value={this.playerA()}/>
          <PlayerPreview value={this.playerB()}/>
        </div>
      </div>
    );
  }

}

export default App;
