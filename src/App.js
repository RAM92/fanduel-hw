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
      attempts: 0,
      successfulAttempts: 0
    };
  }

  componentDidMount() {
    fetch('/Player.json')
    .then(response => response.json())
    .then(data => {
      this.setState({
        players: data.players,
      });
      this.loadPlayers();

      this.setState({
        isLoaded: true
      });
    });
  }

  loadPlayers() {
    this.setState({
      playerA: this.state.players[this.state.playerAOffset],
      playerB: this.state.players[this.state.playerBOffset]
    });
  }

  loadNewPlayers() {
    const { playerAOffset, playerBOffset} = this.state;
    this.setState({
      playerAOffset: playerAOffset + 2,
      playerBOffset: playerBOffset + 2,
    });
    this.loadPlayers();
  }

  selectPlayer(higherPlayer, lowerPlayer) {
    this.setState(state => ({ attempts: state.attempts + 1 }))

    if (higherPlayer.fppg > lowerPlayer.fppg) {
      console.log('You win this round!')
      this.setState({ successfulAttempts: this.state.successfulAttempts + 1})
    } else {
      console.log('You lose this round!')
    }

    this.loadNewPlayers();
  }

  render () {
    return !this.state.isLoaded ? (<div>Loading...</div>) :
    (
      <div className="App">
        Select player with highest FPPG
        <GuessCount total={this.state.attempts} correct={this.state.successfulAttempts} />
        <div className="players">
          <PlayerPreview className="player" onSelect={() => this.selectPlayer(this.state.playerA, this.state.playerB)} value={this.state.playerA}/>
          <div className="v">
            <h1>V</h1>
          </div>
          <PlayerPreview className="player" onSelect={() => this.selectPlayer(this.state.playerB, this.state.playerA)} value={this.state.playerB}/>
        </div>
        <button onClick={() => this.loadNewPlayers()}>Load new</button>
      </div>
    );
  }

}

export default App;
