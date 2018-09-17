// tic-tac-toe.js
// Questions:
// format board correctly?
// how to run program?
// how to run and test program without the test program

// A = 0 1 = 0
// B = 1 2 = 1
// C = 2 3 = 2
// row, col 0,0 | 0,1 | 0,2 | 1,0 | 1,1 | 1,2 | 2,0 | 2,1 | 2,2
// let num  A1  | A2  | A3  | B1  | B2  | B3  | C1  | C2  | C3
// index    0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8
function board (rows, columns, initialCellValue) {
  if (initialCellValue) {
    return Array(rows * columns).fill(initialCellValue)
  }
  return Array(rows * columns).fill('')
}

function toIndex (board, row, col) {
  // rowIndex = row * rowLength;
  // finalIndex = rowIndex + col;
  const rowLength = Math.sqrt(board.length)
  const rowIndex = row * rowLength
  const finalIndex = rowIndex + col
  return finalIndex
}

function toRowCol (board, i) {
  // 1, 1 i = 4
  // i - Math.sqrt(board.length) = rowIndex
  // 4 - 3 = 1 = rowIndex
  // 4 % 3 = 1 = colIndex
  // 0, 2 i = 2
  // if(i - Math.sqrt(board.length) < Math.sqrt(board.length)){
  // rowIndex = 0
  // 2 % 3 = 2
  // }
  let rowIndex
  if (i - Math.sqrt(board.length) < 0) {
    rowIndex = 0
  } else {
    rowIndex = i - Math.sqrt(board.length)
  }
  let colIndex = i % Math.sqrt(board.length)
  return { row: rowIndex, col: colIndex }
}

function setBoardCell (board, letter, row, col) {
  const index = toIndex(board, row, col)
  const shallowArr = board.slice(0, board.length)
  if (shallowArr[index] === '') {
    shallowArr[index] = letter
  }
  return shallowArr
}

function letterToNum (letter) {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const tempLet = letter.toLowerCase()
  return alphabet.indexOf(tempLet)
}

function validChar (letter) {
  const word = /^[0-9a-zA-Z]+$/
  if (letter.match(word)) {
    return true
  }
  return false
}

function algebraicToRowCol (algebraicNotation) {
  // returns undefined if the notation contains invalid characters
  // use typeof to see if the letters are in correct order e.g 2A = invalid
  if (algebraicNotation.length === 1) {
    return undefined
  }
  if (!isNaN(algebraicNotation.charAt(0))) {
    return undefined // if first letter is a number then undefined
  }
  if (!validChar(algebraicNotation)) {
    return undefined
  }
  /* if (isNaN(algebraicNotation.charAt(1))) {
    return undefined // if second letter is a letter then undefined
  }
  if (isNaN(algebraicNotation.charAt(algebraicNotation.length - 1))) {
    return undefined // if last letter is a letter then undefined
  } */
  // col = number of the column - 1
  // row = ?
  // make sure it is uppercase/lowercase?
  let num = ''
  const rowIndex = letterToNum(algebraicNotation.charAt(0))
  for (let i = 1; i < algebraicNotation.length; i++) {
    if (isNaN(algebraicNotation.charAt(i))) {
      return undefined // checks to see if the letters after the initial letter are letters and if they are then it is undefined
    }
    num += algebraicNotation.charAt(i)
  }
  const colIndex = parseInt(num) - 1
  const rowInd = { row: rowIndex, col: colIndex }
  return rowInd
}

function placeLetters (board, letter, ...algebraicNotation) {
  // mocha test/tic-tac-toe-test.js
  // setBoardCell (board, letter, row, col)
  // what does it mean to skip a move
  // come back too and get help
  // need help with using the rest operator correctly
  // ensure that you account for uneven and even number of arguments after board
  /* if (algebraicToRowCol(algebraicNotation[0]) === undefined) {
    return board
  } */
  if (!validChar(algebraicNotation[0])) {
    return board
  }
  const rowColArrz = algebraicToRowCol(algebraicNotation[0])
  const rowIndexz = rowColArrz.row
  const colIndexz = rowColArrz.col
  board = setBoardCell(board, letter, rowIndexz, colIndexz)
  for (let i = 1; i < algebraicNotation.length - 1; i = i + 2) {
    if (algebraicToRowCol(algebraicNotation[i + 1]) === undefined) {
      return board
    }
    const rowColArr = algebraicToRowCol(algebraicNotation[i + 1])
    const rowIndex = rowColArr.row
    const colIndex = rowColArr.col
    board = setBoardCell(board, algebraicNotation[i], rowIndex, colIndex)
  }
  return board
}

function boardToString(board) {
    const boardLength = Math.sqrt(board.length);
    let stringBoard = "     ";
    let horizontalBorder = "";

    // build horizontal border
    for (let i = 0; i < boardLength; i++) {
        horizontalBorder += "+---";
    }
    // append closing +
    horizontalBorder += "+";

    // add cols labels
    for (let i = 0; i < boardLength; i++) {
        stringBoard += (i + 1) + "   ";
    }

    // top border
    stringBoard += "\n" + "   " + horizontalBorder;

    // build row labels + rows
    for (let i = 0; i < boardLength; i++) {
        stringBoard += "\n";
        let currRowAlgebraic = String.fromCharCode(i + 65);
        stringBoard += " " + currRowAlgebraic + " |"; // row label
        stringBoard += buildRowContent(board, currRowAlgebraic, boardLength);
        stringBoard += "\n   " + horizontalBorder; // horizontal border

    }

    function buildRowContent(board, currRowAlgebraic, boardLength) {
        let rowContent = "";

        for (let j = 0; j < boardLength; j++) {
            let algebraicNotation = currRowAlgebraic + (j + 1);
            // console.log(algebraicNotation);
            // console.log(algebraicToRowCol(algebraicNotation));
            let rowCol = algebraicToRowCol(algebraicNotation);
            // console.log(rowCol.row);
            // console.log(rowCol.col);
            // console.log(toIndex(board, rowCol.row, rowCol.col));
            let currRowColContent = board[toIndex(board, rowCol.row, rowCol.col)];
            // console.log("currRowColContent: " + currRowColContent);

            if (currRowColContent === "") {
                currRowColContent = " ";
            }
            rowContent += " " + currRowColContent + " |";
        }
        return rowContent;
    }

    return stringBoard;
}

function getWinnerRows (board) {
  // mocha test/tic-tac-toe-test.js
  const boardLength = Math.sqrt(board.length)
  let boardIndex = 0
  let newArr = new Array(boardLength)
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = new Array(boardLength)
  }
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      if (board[boardIndex] !== undefined) {
        newArr[i][j] = board[boardIndex]
      } else {
        newArr[i][j] = ' '
      }
      boardIndex++
    }
  }
  let counter = 0
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength - 1; j++) {
      let symbol = ''
      if (newArr[i][j] === newArr[i][j + 1] && newArr[i][j] !== '') {
        counter++
        symbol = newArr[i][j]
      }
      if (counter === boardLength - 1) {
        return symbol
      }
    }
    counter = 0
  }
  return undefined
}

/* function getWinnerRows (board) {
  // mocha test/tic-tac-toe-test.js
  const subtract = Math.sqrt(board.length)
  for (let i = 0; i < board.length - subtract; i = i + subtract) {
    if (board[i] === board[i + 1] && board[i] === board[i + 2] && board[i] !== '') {
      return board[i]
    }
  }
  return undefined
} */

/* function getWinnerCols (board) {
// 3x3 = 9
// row, col 0,0 | 0,1 | 0,2 | 1,0 | 1,1 | 1,2 | 2,0 | 2,1 | 2,2
// let num  A1  | A2  | A3  | B1  | B2  | B3  | C1  | C2  | C3
// index    0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8
  for (let i = 0; i < board.length - 3; i = i + 3) {
    if (board[i] === board[i + 2] && board[i] === board[i + 1] && board[i] !== '') {
      return board[i]
    }
  }
  return undefined
} */

function getWinnerCols (board) {
  // mocha test/tic-tac-toe-test.js
  const boardLength = Math.sqrt(board.length)
  let boardIndex = 0
  let newArr = new Array(boardLength)
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = new Array(boardLength)
  }
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      if (board[boardIndex] !== undefined) {
        newArr[i][j] = board[boardIndex]
      } else {
        newArr[i][j] = ' '
      }
      boardIndex++
    }
  }
  let counter = 0
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength - 1; j++) {
      let symbol = ''
      if (newArr[j][i] === newArr[j + 1][i] && newArr[j][i] !== '') {
        counter++
        symbol = newArr[j][i]
      }
      if (counter === boardLength - 1) {
        return symbol
      }
    }
    counter = 0
  }
  return undefined
}

function getWinnerDiagonals (board) {
  // mocha test/tic-tac-toe-test.js
  /* See if all the same index is equal value
    Start at 0,2 end 2,0
    0,2 -> 1,1 -> 2,0
    Plus 1 minus 1 to indexes */
  const boardLength = Math.sqrt(board.length)
  let boardIndex = 0
  let newArr = new Array(boardLength)
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = new Array(boardLength)
  }
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      if (board[boardIndex] !== undefined) {
        newArr[i][j] = board[boardIndex]
      } else {
        newArr[i][j] = ' '
      }
      boardIndex++
    }
  }
  let ind1 = 0
  let ind2 = 0
  let counter = 0
  let tempVal = newArr[0][0]
  if (tempVal !== ' ') {
    while (ind1 !== boardLength) {
      if (newArr[ind1][ind2] === tempVal && tempVal !== ' ') {
        counter++
      } else {
        counter = 0
      }
      ind1++
      ind2++
    }
    if (counter === boardLength) {
      return tempVal
    }
  }
  let nBL = Math.sqrt(board.length) - 1
  let ind1new = 0
  let ind2new = nBL
  let newCount = 0
  let nTempVal = newArr[0][nBL]
  if (nTempVal !== ' ') {
    while (ind1new !== boardLength) {
      if (newArr[ind1new][ind2new] === nTempVal && nTempVal !== ' ') {
        newCount++
      } else {
        newCount = 0
      }
      ind1new++
      ind2new--
    }
    if (newCount === boardLength) {
      return nTempVal
    }
  }
  /* for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength - 1; j++) {
      let symbol = ''
      if (newArr[i][j] === newArr[j + 1][i] && newArr[j][i] !== '') {
        counter++
        symbol = newArr[j][i]
      }
      if (counter === 2) {
        return symbol
      }
    }
    counter = 0
  } */
  return undefined
}

function space (item) {
  return item === ''
}
function isBoardFull (board) {
  // mocha test/tic-tac-toe-test.js
  /* if (board.some(space) === false) {
    return true
  }
  if (board.some(space)) {
    return false
  } */
  return !board.some(space)
}

function isValidMove (board, row, col) {
  const boardLength = Math.sqrt(board)
  if (row >= boardLength || col >= boardLength || row < 0 || col < 0) {
    return false // checks if the row, col is within boundaries
  }
  const index = toIndex(board, row, col)
  if (board[index] === '') {
    return true
  }
  return false
}

function isValidMoveAlgebraicNotation (board, algebraicNotation) {
  const rowColArray = algebraicToRowCol(algebraicNotation)
  const row = rowColArray.row
  const col = rowColArray.col
  return isValidMove(board, row, col)
}

function getRandomEmptyCellIndex (board) {
  // mocha test/tic-tac-toe-test.js
  const emptyCellArray = []
  let emptyCellIndex = 0
  let fullCount = 0
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      emptyCellArray[emptyCellIndex] = i
      emptyCellIndex++
    } else {
      fullCount++
    }
  }
  if (fullCount === board.length) {
    return undefined
  }
  const randomIndex = Math.floor(Math.random() * emptyCellArray.length)
  return emptyCellArray[randomIndex]
}

module.exports = {
  board: board,
  toIndex: toIndex,
  toRowCol: toRowCol,
  setBoardCell: setBoardCell,
  letterToNum: letterToNum,
  validChar: validChar,
  algebraicToRowCol: algebraicToRowCol,
  placeLetters: placeLetters,
  boardToString: boardToString,
  getWinnerRows: getWinnerRows,
  getWinnerCols: getWinnerCols,
  getWinnerDiagonals: getWinnerDiagonals,
  space: space,
  isBoardFull: isBoardFull,
  isValidMove: isValidMove,
  isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
  getRandomEmptyCellIndex: getRandomEmptyCellIndex

}
