import React from 'react';

export default class PlayerPreview extends React.Component {
    render () {
        return (
            <div>{this.props.value.first_name} {this.props.value.second_name}</div>
        )
    }
}