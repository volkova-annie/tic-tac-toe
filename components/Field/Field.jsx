import React, {Component} from 'react';
import {Cell} from '../index';
import {getCookie} from '../utils.js';


class Field extends Component {
  constructor(props) {
    super(props);

    //Rows=3, Cols=3
    this.state = {
      rows: this.generateRows(),
      player: getCookie('player_id')
    }
  }

  generateRows = () => {
    const rowsArray = [];
    const {rows} = this.props;
    for (let i=0; i<rows; i++) {
      rowsArray.push(this.generateCells());
    }
    return rowsArray;
  };

  generateCells = () => {
    const cellsArray = [];
    const {cols} = this.props;
    for (let i=0; i<cols; i++) {
      cellsArray.push({player:null});
    }
    return cellsArray;
  };


  renderRows = () => {
    const {rows} = this.state;
    return rows.map((row, index) => <div key={`row-${index}`} className='field_row'>{this.renderCells(row, index)}</div>)
  };

  renderCells = (row, rowIndex) => row.map((cell, index) => {
    const {players} = this.props;
    const {player} = this.state;
    const playerIndex = players.indexOf(player);

    return <Cell
      player={cell.player}
      players={players}
      // sign={playerIndex>=0 ? playerIndex : null}
      key={`col-${index}`}
      onClick={playerIndex>=0 ? this.handleCellClick.bind(this, rowIndex, index) : null}
    />
  });

  handleCellClick = (rowIndex, cellIndex) => {
    const rows = [...this.state.rows];

    rows[rowIndex][cellIndex].player = this.state.player;
    this.setState({rows: rows})
  };

  render(){
    return <div className='field'>
      {this.renderRows()}
    </div>
  }
}

export {Field};
