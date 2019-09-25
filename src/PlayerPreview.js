import React from 'react';

export default class PlayerPreview extends React.Component {
    render () {
        return (
            <>
            <img src={this.props.value.images.default.url}></img>
            <div>{this.props.value.first_name} {this.props.value.last_name}</div>
            <button>Select higher scpre</button>
            </>
        )
    }
}