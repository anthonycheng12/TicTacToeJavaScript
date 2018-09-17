// game.js
const tic = require('./tic-tac-toe.js')
const readlineSync = require('readline-sync')

const computerMoves = process.argv[2] ? JSON.parse(process.argv[2]) : undefined

const answer = readlineSync.question('Shall we play a game of TIC TAC TOE?')
console.log(answer)

let boardWidth = readlineSync.question('How wide should the board be? (1 - 26):')
let boolFlag = false
while (!boolFlag) {
  if (boardWidth >= 1 && boardWidth <= 26 && (!isNaN(boardWidth))) {
    console.log('Ok ' + boardWidth + ' it is')
    boolFlag = true
  } else {
    console.log('Please pick between 1-26')
    boardWidth = readlineSync.question('How wide should the board be? (1 - 26):')
  }
}

let letterChoice = readlineSync.question('Pick your letter: X or O:')
let booly = false
while (!booly) {
  if (letterChoice === 'X' || letterChoice === 'O') {
    console.log(letterChoice)
    booly = true
  } else {
    console.log('Please pick between X or O caps important')
    letterChoice = readlineSync.question('Pick your letter: X or O:')
  }
}
let move
let board = tic.board(boardWidth, boardWidth, '')
console.log('Player is ' + letterChoice)
console.log(tic.boardToString(board))
// ensure the thing is in bounds
// computerMoves is the array of moves
while (!tic.isBoardFull(board)) {
  // do we have an Array of scripted moves and are there moves left?
  if (computerMoves && computerMoves.length > 0) {
    let compLetters = ''
    console.log('Computer is making the following moves ' + '[' + computerMoves + ']')
    if (letterChoice === 'X') {
      compLetters = 'O'
    } else {
      compLetters = 'X'
    }
    if (compLetters === 'X') {
      const arr = computerMoves.splice(0, 1)[0]
      // make sure it's a valid move!
      if (tic.isValidMove(board, arr[0], arr[1])) {
        move = { 'row': arr[0], 'col': arr[1] }
        let newIndex = tic.toIndex(board, move.row, move.col)
        board[newIndex] = compLetters
        readlineSync.question('Press <ENTER> to show computer\'s move...')
        console.log(tic.boardToString(board))
      }
      // if we still don't have a valid move, just get a random empty square
      if (move === undefined) {
        move = tic.toRowCol(board, tic.getRandomEmptyCellIndex(board))
        let newIndex = tic.toIndex(board, move.row, move.col)
        board[newIndex] = compLetters
        readlineSync.question('Press <ENTER> to show computer\'s move...')
        console.log(tic.boardToString(board))
      }
      let movee = readlineSync.question('What is your move in algebraic notation?')
      while (tic.isValidMoveAlgebraicNotation(board, movee) === false) {
        movee = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      }
      let boolyy = false
      while (!boolyy) {
        if (tic.algebraicToRowCol(movee) !== undefined) {
          console.log('Ok plotting ' + movee)
          board = tic.placeLetters(board, letterChoice, movee)
          console.log(tic.boardToString(board))
          boolyy = true
        } else {
          movee = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
        }
      }
      if (tic.getWinnerRows(board) !== undefined) {
        console.log(tic.getWinnerRows(board) + ' wins')
        break
      }
      if (tic.getWinnerCols(board) !== undefined) {
        console.log(tic.getWinnerCols(board) + ' wins')
        break
      }
      if (tic.getWinnerDiagonals(board)) {
        console.log(tic.getWinnerDiagonals(board) + ' wins')
        break
      }
    } else {
      let movee = readlineSync.question('What is your move in algebraic notation?')
      while (tic.isValidMoveAlgebraicNotation(board, movee) === false) {
        movee = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      }
      let boolyy = false
      while (!boolyy) {
        if (tic.algebraicToRowCol(movee) !== undefined) {
          console.log('Ok plotting ' + movee)
          board = tic.placeLetters(board, letterChoice, movee)
          console.log(tic.boardToString(board))
          boolyy = true
        } else {
          movee = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
        }
      }
      const arr = computerMoves.splice(0, 1)[0]
      // make sure it's a valid move!
      if (tic.isValidMove(board, arr[0], arr[1])) {
        move = { 'row': arr[0], 'col': arr[1] }
        let newIndex = tic.toIndex(board, move.row, move.col)
        board[newIndex] = compLetters
        readlineSync.question('Press <ENTER> to show computer\'s move...')
        console.log(tic.boardToString(board))
      }
      // if we still don't have a valid move, just get a random empty square
      if (move === undefined) {
        move = tic.toRowCol(board, tic.getRandomEmptyCellIndex(board))
        let newIndex = tic.toIndex(board, move.row, move.col)
        board[newIndex] = compLetters
        readlineSync.question('Press <ENTER> to show computer\'s move...')
        console.log(tic.boardToString(board))
      }
      if (tic.getWinnerRows(board) !== undefined) {
        console.log(tic.getWinnerRows(board) + ' wins')
        break
      }
      if (tic.getWinnerCols(board) !== undefined) {
        console.log(tic.getWinnerCols(board) + ' wins')
        break
      }
      if (tic.getWinnerDiagonals(board)) {
        console.log(tic.getWinnerDiagonals(board) + ' wins')
        break
      }
    }

  // if it's not valid, move remains undefined
  } else {
    if (letterChoice === 'X') {
      const compLetter = 'O'
      let move = readlineSync.question('What is your move in algebraic notation?')
      while (tic.isValidMoveAlgebraicNotation(board, move) === false) {
        move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      }
      let boolyy = false
      while (!boolyy) {
        if (tic.algebraicToRowCol(move) !== undefined) {
          console.log('Ok plotting ' + move)
          board = tic.placeLetters(board, letterChoice, move)
          console.log(tic.boardToString(board))
          boolyy = true
        } else {
          move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
        }
        /* if (tic.algebraicToRowCol(move) === undefined || tic.isValidMoveAlgebraicNotation(move) === false) {
            move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
          } else {
            console.log('Ok plotting ' + move)
            board = tic.placeLetters(board, letterChoice, move)
            console.log(tic.boardToString(board))
            boolyy = true
          } */
      }
      if (tic.getWinnerRows(board) !== undefined) {
        console.log(tic.getWinnerRows(board) + ' wins')
        break
      }
      if (tic.getWinnerCols(board) !== undefined) {
        console.log(tic.getWinnerCols(board) + ' wins')
        break
      }
      if (tic.getWinnerDiagonals(board)) {
        console.log(tic.getWinnerDiagonals(board) + ' wins')
        break
      }
      readlineSync.question('Press <ENTER> to show computer\'s move...')
      let compIndex = tic.getRandomEmptyCellIndex(board)
      board[compIndex] = compLetter
      console.log(tic.boardToString(board))
      if (tic.getWinnerRows(board) !== undefined) {
        console.log(tic.getWinnerRows(board) + ' wins')
        break
      }
      if (tic.getWinnerCols(board) !== undefined) {
        console.log(tic.getWinnerCols(board) + ' wins')
        break
      }
      if (tic.getWinnerDiagonals(board)) {
        console.log(tic.getWinnerDiagonals(board) + ' wins')
        break
      }
    } else {
      const compLetter = 'X'
      readlineSync.question('Press <ENTER> to show computer\'s move...')
      let compIndex = tic.getRandomEmptyCellIndex(board)
      board[compIndex] = compLetter
      console.log(tic.boardToString(board))
      if (tic.getWinnerRows(board) !== undefined) {
        console.log(tic.getWinnerRows(board) + ' wins')
        break
      }
      if (tic.getWinnerCols(board) !== undefined) {
        console.log(tic.getWinnerCols(board) + ' wins')
        break
      }
      if (tic.getWinnerDiagonals(board)) {
        console.log(tic.getWinnerDiagonals(board) + ' wins')
        break
      }
      let move = readlineSync.question('What is your move in algebraic notation?')
      while (tic.isValidMoveAlgebraicNotation(board, move) === false) {
        move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      }
      let boolyy = false
      while (!boolyy) {
        if (tic.algebraicToRowCol(move) !== undefined) {
          console.log('Ok plotting ' + move)
          board = tic.placeLetters(board, letterChoice, move)
          console.log(tic.boardToString(board))
          boolyy = true
        } else {
          move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
        }
        /* if (tic.algebraicToRowCol(move) === undefined || tic.isValidMoveAlgebraicNotation(move) === false) {
            move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
          } else {
            console.log('Ok plotting ' + move)
            board = tic.placeLetters(board, letterChoice, move)
            console.log(tic.boardToString(board))
            boolyy = true
          } */
      }
      if (tic.getWinnerRows(board) !== undefined) {
        console.log(tic.getWinnerRows(board) + ' wins')
        break
      }
      if (tic.getWinnerCols(board) !== undefined) {
        console.log(tic.getWinnerCols(board) + ' wins')
        break
      }
      if (tic.getWinnerDiagonals(board)) {
        console.log(tic.getWinnerDiagonals(board) + ' wins')
        break
      }
    }
  }
  /* if (letterChoice === 'X') {
    const compLetter = 'O'
    let move = readlineSync.question('What is your move in algebraic notation?')
    while (tic.isValidMoveAlgebraicNotation(board, move) === false) {
      move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
    }
    let boolyy = false
    while (!boolyy) {
      if (tic.algebraicToRowCol(move) !== undefined) {
        console.log('Ok plotting ' + move)
        board = tic.placeLetters(board, letterChoice, move)
        console.log(tic.boardToString(board))
        boolyy = true
      } else {
        move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      }
      /* if (tic.algebraicToRowCol(move) === undefined || tic.isValidMoveAlgebraicNotation(move) === false) {
        move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      } else {
        console.log('Ok plotting ' + move)
        board = tic.placeLetters(board, letterChoice, move)
        console.log(tic.boardToString(board))
        boolyy = true
      }
    }
    if (tic.getWinnerRows(board) !== undefined) {
      console.log(tic.getWinnerRows(board) + ' wins')
      break
    }
    if (tic.getWinnerCols(board) !== undefined) {
      console.log(tic.getWinnerCols(board) + ' wins')
      break
    }
    if (tic.getWinnerDiagonals(board)) {
      console.log(tic.getWinnerDiagonals(board) + ' wins')
      break
    }
    readlineSync.question('Press <ENTER> to show computer\'s move...')
    let compIndex = tic.getRandomEmptyCellIndex(board)
    board[compIndex] = compLetter
    console.log(tic.boardToString(board))
    if (tic.getWinnerRows(board) !== undefined) {
      console.log(tic.getWinnerRows(board) + ' wins')
      break
    }
    if (tic.getWinnerCols(board) !== undefined) {
      console.log(tic.getWinnerCols(board) + ' wins')
      break
    }
    if (tic.getWinnerDiagonals(board)) {
      console.log(tic.getWinnerDiagonals(board) + ' wins')
      break
    }
  } else {
    const compLetter = 'X'
    readlineSync.question('Press <ENTER> to show computer\'s move...')
    let compIndex = tic.getRandomEmptyCellIndex(board)
    board[compIndex] = compLetter
    console.log(tic.boardToString(board))
    if (tic.getWinnerRows(board) !== undefined) {
      console.log(tic.getWinnerRows(board) + ' wins')
      break
    }
    if (tic.getWinnerCols(board) !== undefined) {
      console.log(tic.getWinnerCols(board) + ' wins')
      break
    }
    if (tic.getWinnerDiagonals(board)) {
      console.log(tic.getWinnerDiagonals(board) + ' wins')
      break
    }
    let move = readlineSync.question('What is your move in algebraic notation?')
    while (tic.isValidMoveAlgebraicNotation(board, move) === false) {
      move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
    }
    let boolyy = false
    while (!boolyy) {
      if (tic.algebraicToRowCol(move) !== undefined) {
        console.log('Ok plotting ' + move)
        board = tic.placeLetters(board, letterChoice, move)
        console.log(tic.boardToString(board))
        boolyy = true
      } else {
        move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      }
      /* if (tic.algebraicToRowCol(move) === undefined || tic.isValidMoveAlgebraicNotation(move) === false) {
        move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
      } else {
        console.log('Ok plotting ' + move)
        board = tic.placeLetters(board, letterChoice, move)
        console.log(tic.boardToString(board))
        boolyy = true
      }
    }
    if (tic.getWinnerRows(board) !== undefined) {
      console.log(tic.getWinnerRows(board) + ' wins')
      break
    }
    if (tic.getWinnerCols(board) !== undefined) {
      console.log(tic.getWinnerCols(board) + ' wins')
      break
    }
    if (tic.getWinnerDiagonals(board)) {
      console.log(tic.getWinnerDiagonals(board) + ' wins')
      break
    }
  } */
}
if (tic.getWinnerCols(board) === undefined && tic.getWinnerDiagonals(board) === undefined && tic.getWinnerRows(board) === undefined) {
  console.log('Tie')
}
/* if (letterChoice === 'X') {
  let move = readlineSync.question('What is your move in algebraic notation?')
  let boolyy = false
  while (!boolyy) {
    if (tic.isValidMoveAlgebraicNotation(move) === false) {
      move = readlineSync.question('What is your move in algebraic notation? Please make sure it is in proper algebraic notation and a valid spot on the board')
    } else {
      console.log('Ok plotting ' + move)
      board = tic.placeLetters(board, letterChoice, move)
      console.log(tic.boardToString(board))
      boolyy = true
    }
  }
}

readlineSync.question('Press <ENTER> to show computer\'s move...') */

/* if (tic.getWinnerCols(board) === undefined && tic.getWinnerDiagonals(board) === undefined && tic.getWinnerRows(board) === undefined) {
      console.log('Tie')
      break
    } */
