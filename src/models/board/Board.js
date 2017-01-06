import React, { Component } from 'react';

import Row from '../row/Row';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      currentPlayer: 'O',
      winner: '',
      tie: false
    };
    this.setPlayer = this.setPlayer.bind(this);
    this.setCell = this.setCell.bind(this);
    this.setNextMove = this.setNextMove.bind(this);
  }

  setPlayer() {
    this.setState({
      currentPlayer: this.state.currentPlayer === 'O' ? 'X' : 'O'
    });
  }

  setCell(symbol, row, cell) {
    const board = [...this.state.board];
    board[row][cell] = symbol;
    this.setState({ board });
  }

  checkWinner() {
     this.checkCorrectCombinationRow(this.state.board);
     this.checkCorrectCombinationCol(this.state.board);
     this.checkCorrectCombinationDiag(this.state.board);
     this.checkTieCombination(this.state.board);
  }

  checkCorrectCombinationRow(board) {
    let won = false;
    board.forEach(row => {
      if (row.every((el, i, arr) => arr[0] === el && arr[0] !== '')) {
        won = true;
      }
    });
    if (won) {
      this.setWinner();
    }
  }

  checkCorrectCombinationCol(board) {
    let won = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[0][i] === board[j][i] && board[0][i] !== '') {
          won = true;
        } else {
          won = false;
          break;
        }
      }
      if (won) {
        break;
      }
    }
    if (won) {
      this.setWinner();
    }
  }

  checkCorrectCombinationDiag(board) {
    let won = false;
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
      won = true;
    } else if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') {
      won = true;
    }
    if (won) {
      this.setWinner();
    }
  }

  checkTieCombination(board) {
    let tie = board.every((row, i, arr) => row.every((cell, i, arr) => cell !== '') );
    if (tie) {
      this.setTie();
    }
  }

  getBoardNextMove(board, player) {
         // Next states
         var nextVal = null;
         var nextBoard = null
         for (var i = 0; i < 3; i++) {
             for (var j = 0; j < 3; j++) {
                 if (board[i][j] === '') {
                     board[i][j] = player === 1 ? 'X' : 'O';
                     let value = this.getBoardNextMove(board, player === 0 ? 1 : 0)[0];
                     if ((player && (nextVal === null || value > nextVal)) || (!player && (nextVal === null || value < nextVal))) {
                         nextBoard = board.map(function(arr) {
                             return arr.slice();
                         });
                         nextVal = value;
                     }
                     board[i][j] = '';
                 }
             }
         }
         return [nextVal, nextBoard];
  }

  getOPlayerAvatar(state) {
    let classPlayer='';
    if(state.currentPlayer === 'O'){
      classPlayer = 'pulse';
    }
    if (state.tie) {
        return (<img className='avatar-image fade-in' src="./images/cold-sweat.png" alt="Smiley face"/>)
      }
    if(state.winner==='O'){
        return (
          <div>
             <img className='avatar-image fade-in' src="./images/smiling-eyes.png" alt="Smiley face"/>
             <div className="pulse">WINNER</div>
          </div>
        )
      }
    if(state.winner==='X'){
        return (<img className='avatar-image fade-in' src="./images/relieved-face.png" alt="Smiley face"/>)
      }

     return (
      <div>
         <img className='avatar-image' src="./images/smiling-face.png" alt="Smiley face"/>
         <div className={ classPlayer }>Player O</div>
      </div>
     );
  }

  getXPlayerAvatar(state) {
    let classPlayer='';
    if(state.currentPlayer === 'X'){
      classPlayer = 'pulse';
    }
    if (state.tie) {
        return (<img className='avatar-image fade-in' src="./images/tired-face.png" alt="Smiley face"/>)
    }
    if(state.winner==='O'){
        return (<img className='avatar-image fade-in' src="./images/dizzy-face.png" alt="Smiley face"/>)
      }
    if(state.winner==='X'){
        return (
        <div>
           <img className='avatar-image fade-in' src="./images/closed-eyes.png" alt="Smiley face"/>
           <div className="pulse">WINNER</div>
        </div>)
      }
     return (
       <div>
          <img className='avatar-image' src="./images/smile-closed-eyes.png" alt="Smiley face"/>
          <div className={ classPlayer }>Player X</div>
       </div>
     );
  }

  setNextMove(){
    this.checkWinner();

   setTimeout(function() {
      if(this.state.winner === ''){
          const board = [...this.getBoardNextMove(this.state.board, this.state.currentPlayer === 'O' ? 0 : 1)[1]];
          this.setState({ board });
          this.checkWinner()

          //change the player to create the animation efect between players
          setTimeout(function() {
            this.setPlayer()
          }.bind(this), 100);
       }
   }.bind(this), 500);
  }

  setWinner() {
    this.setState({
      winner: this.state.currentPlayer
    });
  }

  setTie() {
    this.setState({
      tie: true
    });
  }

  resetAll() {
    this.resetBoard();
    this.resetPlayer();
    this.resetWinner();
    this.resetTie();
  }

  resetBoard() {
    this.setState({
      board: [['', '', ''], ['', '', ''], ['', '', '']]
    });
  }

  resetPlayer() {
    this.setState({
      currentPlayer: "O"
    });
  }

  resetWinner() {
    this.setState({
      winner: ''
    });
  }

  resetTie() {
    this.setState({
      tie: ''
    });
  }

  render() {
    let message;
    const oPlayerAvatar = this.getOPlayerAvatar(this.state);
    const xPlayerAvatar = this.getXPlayerAvatar(this.state);

    if (this.state.tie) {
      message = 'No winner!'
    }

    return (
      <div>
          <div className="app-header">
              <h2>Tic Tac Toe</h2>
          </div>
          <div className="app-container">
              <div className="message-space full-width fade-in">
                  <p>{message}</p>
              </div>
              <div className="content-spacing-2 display-inline full-width">
                  <div className="content-margin-1">
                    { oPlayerAvatar }
                  </div>
                  <div>
                      <table className="full-width">
                        <tbody>
                          {
                            this.state.board
                              .map((row, index) =>
                                <Row
                                  key={index}
                                  index={index}
                                  row={row}
                                  winner={this.state.winner}
                                  setPlayer={this.setPlayer}
                                  currentPlayer={this.state.currentPlayer}
                                  setCell={this.setCell}
                                  setNextMove={this.setNextMove}
                                />)
                          }
                        </tbody>
                      </table>
                  </div>
                  <div className="content-margin-1">
                    { xPlayerAvatar }
                  </div>
            </div>
            <div>
                <button className="button float-right" onClick={(e) => this.resetAll(e)} type="reset">New Game</button>
            </div>
          </div>
        </div>
    )
  }
}

export default Board;
