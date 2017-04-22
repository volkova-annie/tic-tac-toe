import React, {Component} from 'react';

class Button extends Component {
  render(){
    return <button {...this.props} type="button" className={`btn btn-${this.props.type}`}>{this.props.children}</button>
  }
}

export {Button};
