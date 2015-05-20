// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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

    /*
    board.rows -> returns array of n length
    board.get(num) -> returns rows[num]
    board.get('n') -> returns width of board
    board.toggle(1, 2) -> changes
     */
    hasRowConflictAt: function(rowIndex) {
      var pieces = 0;
      var size = this.get('n');
      console.log("inside has row conflict");
      for (var i = 0; i < size; i++) {
        if (this.get(rowIndex)[i] === 1) {
          pieces++;
        }
      }
      if (pieces > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    // can you reference hasRowConflictAt in this function?
    hasAnyRowConflicts: function() {
       var size = this.get('n');
       for(var i = 0; i < size; i++){
        var pieces = 0;
          for (var j = 0; j < size; j++) {
            if (this.get(i)[j] === 1) {
              pieces++;
            }
          }
        if (pieces > 1) {
          return true;
        }

       }
       return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var pieces = 0;
      var size = this.get('n');
      for(var i = 0; i < size; i++){
        if(this.get(i)[colIndex] === 1){
          pieces++;
        }
      }
      if(pieces > 1){
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var size = this.get('n');
      for( var i = 0; i < size; i++){
        var pieces = 0;
        for(var j = 0; j < size; j++){
          if(this.get(j)[i] === 1){
            pieces++;
          }
        }
        if(pieces > 1){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var row;
      var col = majorDiagonalColumnIndexAtFirstRow;
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        row = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        col = 0;
      } else {
        row = 0;
      }
      console.log(this.get(row))
      var size = this.get('n');
      var pieces = 0;
      for (var i = 0; i < size - Math.abs(majorDiagonalColumnIndexAtFirstRow); i++) {
        if(this.get(row)[col] === 1) {
          pieces++;
        }
        row++;
        col++;
      }
      if (pieces > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');
      var row = size-2;
      var col = 0;
      var testLength = (2*size)-3;
      var truthy = false;
      for (var i = 0; i < testLength; i++) {
        var pieces = 0;
        var limit = size-(row+col);
        for (var j=0; j < limit; j++) {
          if(this.get(row)[col] === 1) {
            pieces++;
          }
          row++;
          col++;
        }

        if (pieces > 1) {
          return true;
        }
        if (col < size && !truthy) {
          row = (size - 3 - i);
          col = 0;
        }
        else {
          col = (i - size + 3);
          row = 0;
          truthy = true;

          //change j limit
        }

      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var size = this.get('n');
      var row;
      var col = minorDiagonalColumnIndexAtFirstRow;
      if (minorDiagonalColumnIndexAtFirstRow > size-1) {
        row = minorDiagonalColumnIndexAtFirstRow - size+1;
        col = size-1;
      } else {
        row = 0;
      }
      var pieces = 0;
      for (var i = 0; i < size - (minorDiagonalColumnIndexAtFirstRow); i++) {
        if(this.get(row)[col] === 1) {
          pieces++;
        }
        row++;
        col--;
      }
      if (pieces > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n');
      var row = size-2;
      var col = size-1;
      var testLength = (2*size)-3;
      var truthy = false;
      for (var i = 0; i < testLength; i++) {
        var limit = col-row+1;
        var pieces = 0;
        for (var j=0; j < limit; j++) {
          if(this.get(row)[col] === 1) {
            pieces++;
          }
          row++;
          col--;
        }

        if (pieces > 1) {
          return true;
        }
      if(col > 0 && !truthy){
          row = size-3-i
          col = size-1;
      } else{
          truthy = true;
          row = 0;
          col = (2*size)-4-i;
      }

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
