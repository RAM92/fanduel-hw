import React from 'react';

export default class PlayerPreview extends React.Component {
    render () {
        return (
            <div onClick={this.props.onSelect} style={{cursor: 'pointer'}}>
                <img 
                style={{
                    width: this.props.value.images.default.width,
                    height: this.props.value.images.default.height}}
                src={this.props.value.images.default.url}></img>
                <div>{this.props.value.first_name} {this.props.value.last_name}</div>
            </div>
        )
    }
}