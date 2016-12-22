// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.rows()[rowIndex];
      var conflictCount = _.reduce(row, function(memo, num) {
        return memo + num;
      }, 0);

      if (conflictCount < 2) {
        return false;
      } else {
        return true;
      } 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // create a isConflict variable
      // grab the chess board by invoking this.rows();
      var board = this.rows();
      // iterate over the entire board
      for (var i = 0; i < board.length; i++) {
        // at each iteration, invoke hasRowConflictAt[i] and store it's value (boolean)
        var isConflict = this.hasRowConflictAt(i); // isConflict will return a boolean value
        // if isConflict is equal to true, exit out of the forloop
        if (isConflict) {
          return true;
        }
      }
      return isConflict; // fixme
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) { // takes in a number
     // create a conflictCounter
      var conflictCounter = 0;
      // grab the board
      var board = this.rows();
      // iterate through the board's rows
      // OR set reduce to conflictCounter
      for (var i = 0; i < board.length; i++) {
        // check each row at colIndex
        // if it is equal to 1, add to counter 
        if (board[i][colIndex] === 1) {
          conflictCounter++;
        }
      }
      // check if conflictCounter is greater than 1
      if (conflictCounter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get board
      var board = this.rows();
      // iterate over board
      for (var i = 0; i < board.length; i++) {
        // set results equal to hasColConflictAt(i)
        var results = this.hasColConflictAt(i);
        // if the results is true, exit out of the for loop
        if (results) {
          return true;
        }     
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // var counter to keep track of conflicts
      var counter = 0;
      // create variable 'row' = 0
      var row = 0;
      // create variable 'col' = mD
      var col = majorDiagonalColumnIndexAtFirstRow;
      // access to the board
      var board = this.rows();
      // while the row is < board.length, 
      while (row < board.length) {
        //check the square for queens
          //if there's a queen, increase counter++
        if (board[row][col] === 1) {
          counter++;
        }
        //increment the row and column
        col++;
        row++;
      }
      //if counter > 1
      if (counter > 1) {
        //return true
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      // get major Diagonal name 
      // since there could be negative names, use the math operation below to find starting point:
      var majDiagName = -Math.abs(board.length - 2);
      //create a while loop 
      while (majDiagName < board.length) {
        var isConflict = this.hasMajorDiagonalConflictAt(majDiagName);
        if (isConflict) {
          return true;
        }
        majDiagName++;
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // var col = minorDiag
      var col = minorDiagonalColumnIndexAtFirstRow;
      // create variable row at 0
      var row = 0;
      // create a counter
      var counter = 0;
      // get board
      var board = this.rows();
      // while row < board.length
      while (row < board.length) {
      // check if the cell has a value of 1
        if (board[row][col] === 1) {
          // if it does, increment counter
          counter++;
        } 
        // increment row by one 
        row++;
        // decrease col by one
        col--;
      }
      // if counter > 1 
      if (counter > 1) {
        // return true
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //create variable to get board
      var board = this.rows();
      // get starting point for the minor diagonal conflicts on the board 
      var minDiagName = board.length + 1;
      // while minDiagName is greater than zero
      while (minDiagName > 0) {
        // call the minorDiagAt fnc
        var isConflict = this.hasMinorDiagonalConflictAt(minDiagName);
        if (isConflict) {
          return true;
        }
        minDiagName--;
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });








  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
