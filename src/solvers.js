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

window.findNRooksSolution = function(n) {
  var arr = [];
  for(var i = 0; i < n; i++){
    var row = [];
    for(var j = 0; j < n; j++){
      if(i===j){
        row.push(1);
      } else{
        row.push(0);
      }
    }
    arr.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(arr));
  return arr;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  if(n<3){
    return n;
  }
  var myBoard = new Board({'n':n});
  var makeSolution = function(board, p){
    for(var i = 0; i < n; i++){
      //make sure current board is valid, because prev. correct has pieces
      if(i > 0){
        board.rows()[p][i-1] = 0;
        for(var j = p+1; j < n; j++){
          for(var k = 0; k < n; k++){
            board.rows()[j][k] = 0;
          }
        }
      }
      //make decision
      board.rows()[p][i] = 1;
      if(board.hasAnyRooksConflicts()){
        board.rows()[p][i] = 0;
      } else{
        if(p+1 === n){
          solutionCount++;
        } else{
          makeSolution(board, p+1);
        }
      }
    }
  };
  makeSolution(myBoard, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  if(n<2){
    return 1;
  }
  if(n<4){
    return 0;
  }
  var storage = [];
  var myBoard = new Board({'n':n});
  var makeSolution = function(board, p){
    for(var i = 0; i < n; i++){
      //make sure current board is valid, because prev. correct has pieces
      if(i > 0){
        board.rows()[p][i-1] = 0;
        for(var j = p+1; j < n; j++){
          for(var k = 0; k < n; k++){
            board.rows()[j][k] = 0;
          }
        }
      }
      //make decision
      board.rows()[p][i] = 1;
      if(board.hasAnyQueensConflicts()){
        board.rows()[p][i] = 0;
      } else{
        if(p+1 === n){
          solutionCount++;
          storage.push(board);
        } else{
          makeSolution(board, p+1);
        }
      }
    }
  };
  makeSolution(myBoard, 0);
  console.log(storage);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

/*var newBoard = [[0, 0, 0, 0]];
  var solutions = [];
  var three = [
    [[1, 0, 0],
     [0, 1, 0],
     [0, 0, 1]],
    [[0, 0, 1],
     [0, 1, 0],
     [1, 0, 0]],
    [[1, 0, 0],
     [0, 0, 1],
     [0, 1, 0]],
    [[0, 0, 1],
     [1, 0, 0],
     [0, 1, 0]],
    [[0, 1, 0],
     [1, 0, 0],
     [0, 0, 1]],
    [[0, 1, 0],
     [0, 0, 1],
     [1, 0, 0]]
  ];

  for (var i = 0; i<n; i++) {
    newBoard[0][i]=1;
    if(i>0){
      newBoard[0][i-1]=0;
    }
    var a = [newBoard[0]];
    for(var j = 1; j <= three.length; j++){
      a[j][i]=0;
      a[j][])
    }
    solutions.push()
  }*/

  // var solutions = [];
  //  var makeEmptyMatrix = function(n) {
  //   return _(_.range(n)).map(function() {
  //     return _(_.range(n)).map(function() {
  //       return 0;
  //     });
  //   });
  // };
  //  var recurse = function(board, i){
  //   var skip = i;
  //   for(var j = 1; j < n; j++){
  //     if(i === board.get('n')-1){
  //       i = 0;
  //     }
  //     board.toggle(j, i+1);
  //     i++;
  //   }
  //   if(board)
  //     solutions.push(board);
  //     solutionCount++;
  //   };
  //   //if solution is valid AND pieces === n
  // for(var i = 0; i < n; i++){
  //   var board = makeEmptyMatrix(n);
  //   board.toggle(0, i);
  //   recurse(board, i);
  // }
  //
  //   //make a storage for n (hypothetical) next boards
      //loop though n times
   /* for(var i = 0; i < n; i++){
        //create a SINGLE next hypothetical board
        // copy board onto hypo
      var hypo = new Board({'n':n});
      for(var a = 0; a < p; a++){
        hypo.rows()[a]=board.rows()[a];
      }
      // add something new to hypo
      hypo.togglePiece(p, i)
      if(!hypo.hasAnyRookConflicts && p<n){
        //check if it has conflicts
        hypoStorage.push(hypo);
      }else if(!hypo.hasAnyRookConflicts && p === n){
          //none -> check if p === n
            //push into solution storage
          //put into local storage line 41
        solutionStorage.push(hypo);
        solutionCount++;
      }
    }*/
  // var myBoard = new Board({'n':n});
  // makeRookSolutions(myBoard, 0);
  // for(var k = 0; k < hypoStorage.length; k++){
  //   //loop through local storage and recursively call mRS(localS[], p+1);
  //   for(var j = 0; j < hypoStorage[k].length; j++){
  //     makeRookSolutions(hypoStorage[k], p);
  //     p++;
  //   }
  // }
  //     console.log(solutionStorage);
  //
  //
  // if(n<3){
  //   return n;
  // }
  // var solutionCount = 0;
  // var solutions = [];

  // var makeSolution = function(myBoard, row) {
  //   if(row === n){
  //     solutions.push(myBoard);
  //     solutionCount++;
  //     return;
  //   }
  //   for(var i = 0; i < n*n; i++){
  //     if(i > n){
  //       i = 0;
  //     }
  //     myBoard.togglePiece(row, i);
  //     if(!myBoard["hasAnyRooksConflicts"]()){
  //       row++;
  //       makeSolution(myBoard, row);
  //       var hold = myBoard.rows()[row];
  //       myBoard.rows()[row-1] = hold;

  //       return;
  //     }
  //     else{
  //       myBoard.togglePiece(row, i);
  //     }
  //   }
  // };
  // for(var i = 0; i < n; i++){
  //   var myBoard = new Board({'n':n});
  //   myBoard.togglePiece(0, i);
  //   makeSolution(myBoard, 1);//empty board with one rook on the top row
  // }
