import React from 'react';

export default class GuessCount extends React.Component {
    render () {
        return (
            <div>{this.props.correct} / {this.props.total}</div>
        )
    }
}