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
  var solutions = [];
   var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
   var recurse = function(board, i){
    var skip = i;
    for(var j = 1; j < n; j++){
      if(i === board.get('n')-1){
        i = 0;
      }
      board.toggle(j, i+1);
      i++;
    }
    if(board)
      solutions.push(board);
      solutionCount++;
    };
    //if solution is valid AND pieces === n
  for(var i = 0; i < n; i++){
    var board = makeEmptyMatrix(n);
    board.toggle(0, i);
    recurse(board, i);
  }

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
  var solutionCount = undefined; //fixme

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
