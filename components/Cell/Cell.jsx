import React, {Component} from 'react';

class Cell extends Component {
  render(){
    const {players, player} = this.props;
    const playerIndex = players.indexOf(player);
    const signs = ['is-cross', 'is-nought']
    return <div onClick={this.props.onClick} className={'cell '+signs[playerIndex]}></div>
  }
}

export {Cell};
