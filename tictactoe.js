class Board {
  constructor() {
    // STUB
    // Need a way to model the 3x3 grid. Maybe squares?
    // What data structure? An Array? An Object? Something else?
    // What should the data structure store? Strings? Numbers? Square objects?
  }
}

class Square {
  constructor() {
    // STUB
    // We need some way to keep track of this square's marker.
  }
}

class Row {
  constructor() {
    // STUB
    // We need some way to identify a row of 3 squares
  }
}

class Marker {
  constructor() {
    // STUB
    // A marker is something that represents a player's "piece" on the board
  }
}

class Player {
  constructor() {
    // STUB
    // maybe a marker to keep track of this player's symbol ('X' or 'O')
  }

  mark() {
    // STUB
    // We need a way to mark the board with this player's marker
    // How do we access the board?
  }

  play() {
    // STUB
    // We need a way for each player to play the game
    // Do we need access to a board?
  }
}

class Human extends Player {
  constructor() {
    //STUB
  }
}

class Computer extends Player {
  constructor() {
    // STUB
  }
}

class TTTGame {
  constructor() {
    // STUB
    // Need a board and two players
  }

  play() {
    // STUB
    // orchestrate game play
  }
}

let game = new TTTGame();
game.play();
