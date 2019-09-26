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
      this.setState(state => ({
        players: data.players,
        playerA: data.players[state.playerAOffset],
        playerB: data.players[state.playerBOffset],
        isLoaded: true
      }));
    });
  }

  loadNewPlayers() {
    this.setState(({ playerAOffset, playerBOffset, players}) => ({
      playerAOffset: playerAOffset + 2,
      playerBOffset: playerBOffset + 2,
      playerA: players[playerAOffset + 2],
      playerB: players[playerBOffset + 2],
    }));
  }

  selectPlayer(guessHigherPlayer, guessLowerPlayer) {
    this.setState(state => ({ attempts: state.attempts + 1 }))

    if (guessHigherPlayer.fppg > guessLowerPlayer.fppg) {
      console.log('User won this round!') // todo: real logging in places like this
      this.setState(state => ({ successfulAttempts: state.successfulAttempts + 1}))
    } else {
      console.log('User lost this round!')
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
