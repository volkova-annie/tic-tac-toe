import React, {Component} from 'react';
import {Cell} from '../index';

class Field extends Component {
  renderRows = () => {
    const rowsArray = [];
    const {rows} = this.props;
    for (let i=0; i<rows; i++) {
      rowsArray.push(<div key={`row-${i}`} className='field_row'>{this.renderCols()}</div>);
    }
    return rowsArray;
  }
  renderCols = () => {
    const colsArray = [];
    const {cols} = this.props;
    for (let i=0; i<cols; i++) {
      colsArray.push(<Cell key={`col-${i}`}/>);
    }
    return colsArray;
  }

  render(){
    return <div className='field'>
      {this.renderRows()}
    </div>
  }
}

export {Field};
