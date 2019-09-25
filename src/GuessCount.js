import React from 'react';

export default class GuessCount extends React.Component {
    render () {
        return (
            <div>Correct guesses: {this.props.value}</div>
        )
    }
}