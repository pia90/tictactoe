import React, { Component } from 'react';

class Cell extends Component {
  playCell(event) {
    if (event.target.className === '') {
      this.props.setCell(this.props.currentPlayer, this.props.rowIndex, this.props.index);
      this.props.setPlayer();
    }
    this.props.setNextMove();
  }

  render() {
    let classNameString = ''
    let disableButton = this.props.winner || this.props.currentPlayer === 'X'
    if(this.props.cell!==''){
      classNameString = this.props.cell.toLowerCase() + '-marker zoom-in'
    }

    return (
      <td>
        <button className={ classNameString } onClick={(e) => this.playCell(e)} disabled={disableButton}>
        </button>
      </td>
    )
  }
}
export default Cell;
