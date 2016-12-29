import React, { Component } from 'react';
import Cell from './Cell';

class Row extends Component {
  render() {
    return (
      <tr>
        {
          this.props.row
            .map((cell, index) =>
              <Cell
                key={index}
                index={index}
                rowIndex={this.props.index}
                cell={cell}
                winner={this.props.winner}
                setPlayer={this.props.setPlayer}
                currentPlayer={this.props.currentPlayer}
                setCell={this.props.setCell}
                setNextMove={this.props.setNextMove}
              />)
        }
      </tr>
    )
  }
}

export default Row;
