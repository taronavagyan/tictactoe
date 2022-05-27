const readline = require("readline-sync");

const INITIAL_MARKER = " ";
const HUMAN_MARKER = "X";
const COMPUTER_MARKER = "O";
//prettier-ignore
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7], // diagonals
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board) {
  if (typeof board !== "object") board = initalizeBoard();
  console.log("");
  console.log("     |     |");
  console.log(`  ${board["1"]}  |  ${board["2"]}  |  ${board["3"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${board["4"]}  |  ${board["5"]}  |  ${board["6"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${board["7"]}  |  ${board["8"]}  |  ${board["9"]}`);
  console.log("     |     |");
  console.log("");
}

function initalizeBoard() {
  let board = {};

  for (let count = 1; count <= 9; count += 1) {
    board[count] = " ";
  }
  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter((key) => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square ${emptySquares(board).join(", ")}:`);
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;
    prompt("That's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);

  let square = emptySquares(board)[randomIndex];
  board[square] = COMPUTER_MARKER;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

// eslint-disable-next-line max-lines-per-function
function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return "Player";
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return "Computer";
    }
  }

  return null;
}

while (true) {
  let board = initalizeBoard();

  while (true) {
    displayBoard(board);

    playerChoosesSquare(board);
    if (boardFull(board) || someoneWon(board)) break;

    computerChoosesSquare(board);
    displayBoard(board);

    if (boardFull(board) || someoneWon(board)) break;
  }

  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt("It's a tie!");
  }

  prompt("Would you like to play again? y/n");
  let answer = readline.question().toLowerCase()[0];

  if (answer !== "y") break;
}

prompt("Thanks for playing!");
