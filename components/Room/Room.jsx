import React, {Component} from 'react';
import {Field} from '../index';

class Room extends Component {
  render(){
    return <div>
      <div>room/{this.props.id}</div>
      <Field players={this.props.players} cols={3} rows={3}/>
    </div>
  }
}

export {Room};
