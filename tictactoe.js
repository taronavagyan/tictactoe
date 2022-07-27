const readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.reset();
  }

  // eslint-disable-next-line max-lines-per-function
  display() {
    console.log("");
    console.log("     |     |");
    console.log(
      `  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`
    );
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(
      `  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`
    );
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(
      `  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`
    );
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter((key) => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter((key) => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  reset() {
    this.squares = {};
    for (let squareNum = 1; squareNum <= 9; squareNum += 1) {
      this.squares[squareNum] = new Square();
    }
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"],
    ["3", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  static joinOr = function (array, delimiter = ", ", conjunction = "or") {
    if (array.length <= 1) return array.toString();
    if (array.length === 2) return `${array[0]} ${conjunction} ${array[1]}`;
    let result = "";

    for (let idx = 0; idx < array.length; idx += 1) {
      if (idx + 1 === array.length) {
        result += conjunction + " " + array[idx];
      } else {
        result += array[idx] + delimiter;
      }
    }
    return result;
  };

  play() {
    this.displayWelcomeMessage();

    do {
      this.board.reset();
      this.board.displayWithClear();
      while (true) {
        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMoves();
        if (this.gameOver()) break;

        this.board.displayWithClear();
      }

      this.board.displayWithClear();
      this.displayResults();
    } while (this.playAgain());

    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  playAgain() {
    const VALID_ANSWERS = ["y", "n"];
    let response;
    while (!VALID_ANSWERS.includes(response)) {
      response = readline.question("play again? (y/n)").toLowerCase();
    }
    return response === "y";
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some((row) => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(
        validChoices,
        ", "
      )}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      //prettier-ignore
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
}

let game = new TTTGame();
game.play();
