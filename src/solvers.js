/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

  // //first for loop iterates over rows (i)
  // for (var i = 0; i < board.length; i++) {
  //   //second for loop iterates over columns (j)
  //   for (var j = 0; j < board.length; j++) {
  //     //place rook at board[i][j]
  //     board[i][j] = 1;
  //     //invoke hasAnyRowConflicts[i]
  //     //invoke hasAnyColConflicts[j]
  //     // if one of them returns true, 
  //     if (boardObj.hasAnyRowConflicts(i) || boardObj.hasAnyColConflicts(j)) {
  //       // remove rook (set board[i][j] back to 0)
  //       board[i][j] = 0;
  //     }
  //   }
  // }



window.findNRooksSolution = function(n) {

   // create new board
  var boardObj = new Board({n: n});
  // get new board 
  var board = boardObj.rows();
  //first for loop iterates over rows (i)
  for (var i = 0; i < board.length; i++) {
    //second for loop iterates over columns (j)
    for (var j = 0; j < board.length; j++) {
      //place rook at board[i][j]
      board[i][j] = 1;
      //invoke hasAnyRowConflicts[i]
      //invoke hasAnyColConflicts[j]
      // if one of them returns true, 
      if (boardObj.hasAnyRowConflicts(i) || boardObj.hasAnyColConflicts(j)) {
        // remove rook (set board[i][j] back to 0)
        board[i][j] = 0;
      }
    }
  }

  var solution = board; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  // create new board
  var board = new Board({n: n});
  
  var solutionCount = 0;
 
  // create a rows variable
  var addByRow = function (board, row) {
      // if we are at the last row
    if (row === n) {
      solutionCount++;
      return;
    // else check for conflicts, 
    }
    // iterate over the first row
    for (var i = 0; i < n; i++) {
      // place rook by using toggle (row, col) 
      board.togglePiece(row, i);
      //check if there are no conflicts 
      if (!board.hasAnyRooksConflicts()) {
      // recurse to the next row with new board by incrementing the row 
        addByRow(board, row + 1);
      } 
      // if there are conflicts, remove rook from the board
      board.togglePiece(row, i);
    }
  };
  addByRow(board, 0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
   // create new board
  var solutionCount = 0;
  
  var board = new Board({n: n});

  var solution;
 
  // create a rows variable
  var addByRow = function (row) {
      // if we are at the last row
    if (row === n) {
      solutionCount++;
      // solution = board.rows();
      return;
    // else check for conflicts, 
    }
    // iterate over the first row
    for (var i = 0; i < n; i++) {
      if (solutionCount === 1) {
        solution = board.rows();
        return solution;
      }
      board.togglePiece(row, i);
      // place rook by using toggle (row, col) 
      if (!board.hasAnyQueensConflicts()) {
      // enter the next row with new board by incrementing the row 
      // repeat lines 71/72 until you hit the last row on the board
        addByRow(row + 1);
      } 
      board.togglePiece(row, i);
    }
  };
  addByRow(0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
   // create new board
  var solutionCount = 0;
  
  var board = new Board({n: n});
 
  // create a rows variable
  var addByRow = function (row) {
      // if we are at the last row
    if (row === n) {
      solutionCount++;
      return;
    // else check for conflicts, 
    }
    // iterate over the first row
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      // place rook by using toggle (row, col) 
      if (!board.hasAnyQueensConflicts()) {
      // enter the next row with new board by incrementing the row 
      // repeat lines 71/72 until you hit the last row on the board
        addByRow(row + 1);
      } 
      board.togglePiece(row, i);
    }
  };
  addByRow(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);

  return solutionCount;
};



