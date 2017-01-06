import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils'

import Board from './Board';

const boardElem = document.createElement('div');

beforeEach(function() {
  boardElem = ReactTestUtils.renderIntoDocument(<Board />)
  boardElem.state = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    currentPlayer: 'O',
    winner: '',
    tie: false
  };
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Board />, div);
});


it('change current player to O',()=>{
  boardElem.setPlayer()
  expect(boardElem.state.currentPlayer).toBe('X');
});

it('change board cell[1,1] with current player position',()=>{
  boardElem.setCell(boardElem.state.currentPlayer, 1, 1);
  expect(boardElem.state.board[1][1]).toBe('O');
});

it('check for no winner',()=>{
  boardElem.checkWinner()
  expect(boardElem.state.winner).toBe('');
});

it('check for "X" winner',()=>{
  boardElem.state = {
    board: [['X', '', 'O'], ['', 'X', ''], ['', 'O', 'X']],
    currentPlayer: 'X',
    winner: '',
    tie: false
  };

  boardElem.checkWinner()
  expect(boardElem.state.winner).toBe('X');
});

it('check for "O" winner',()=>{
  boardElem.state = {
    board: [['O', '', 'X'], ['', 'O', ''], ['', 'X', 'O']],
    currentPlayer: 'O',
    winner: '',
    tie: false
  };

  boardElem.checkWinner()
  expect(boardElem.state.winner).toBe('O');
});

it('check for tie scenario',()=>{
  boardElem.state = {
    board: [['O', '0', 'X'], ['X', 'O', 'X'], ['0', 'X', 'X']],
    currentPlayer: 'O',
    winner: '',
    tie: false
  };
  boardElem.checkWinner()
  expect(boardElem.state.tie).toBe(true);
});


it('check for correct combination on column and "X" winner',()=>{
  boardElem.state = {
    board: [['X', '', 'O'], ['X', 'X', ''], ['X', 'O', 'O']],
    currentPlayer: 'X',
    winner: '',
    tie: false
  };

  boardElem.checkCorrectCombinationCol(boardElem.state.board)
  expect(boardElem.state.winner).toBe('X');
});

it('check for correct combination on column and "O" winner',()=>{
  boardElem.state = {
    board: [['O', '', 'X'], ['O', 'O', ''], ['O', 'X', 'X']],
    currentPlayer: 'O',
    winner: '',
    tie: false
  };

  boardElem.checkCorrectCombinationCol(boardElem.state.board)
  expect(boardElem.state.winner).toBe('O');
});

it('check for correct combination on diagonal and "X" winner',()=>{
  boardElem.state = {
    board: [['X', '', 'O'], ['', 'X', ''], ['', 'O', 'X']],
    currentPlayer: 'X',
    winner: '',
    tie: false
  };

  boardElem.checkCorrectCombinationDiag(boardElem.state.board)
  expect(boardElem.state.winner).toBe('X');
});

it('check for correct combination on diagonal and "O" winner',()=>{
  boardElem.state = {
    board: [['O', '', 'X'], ['', 'O', ''], ['', 'X', 'O']],
    currentPlayer: 'O',
    winner: '',
    tie: false
  };

  boardElem.checkCorrectCombinationDiag(boardElem.state.board)
  expect(boardElem.state.winner).toBe('O');
});

it('check for correct combination on row and "X" winner',()=>{
  boardElem.state = {
    board: [['X', 'X', 'X'], ['', 'X', ''], ['', 'O', 'X']],
    currentPlayer: 'X',
    winner: '',
    tie: false
  };

  boardElem.checkCorrectCombinationRow(boardElem.state.board)
  expect(boardElem.state.winner).toBe('X');
});

it('check for correct combination on row and "O" winner',()=>{
  boardElem.state = {
    board: [['O', 'O', 'O'], ['', 'O', ''], ['', 'X', 'O']],
    currentPlayer: 'O',
    winner: '',
    tie: false
  };

  boardElem.checkCorrectCombinationRow(boardElem.state.board)
  expect(boardElem.state.winner).toBe('O');
});


it('set winner current player ("O")',()=>{
  boardElem.setWinner()
  expect(boardElem.state.winner).toBe('O');
});

it('set winner current player ("X")',()=>{
  boardElem.state.currentPlayer='X';
  boardElem.setWinner()
  expect(boardElem.state.winner).toBe('X');
});


it('set tie combination true',()=>{
  boardElem.setTie()
  expect(boardElem.state.tie).toBe(true);
});
