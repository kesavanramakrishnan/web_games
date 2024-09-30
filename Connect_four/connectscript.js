var columns = document.querySelectorAll(".column");
var bigDiv = document.getElementById("bigDiv");
var whoseTurn = "red";
var canClick = true;
var turnPar = document.getElementById("turn");
var winnerPar = document.getElementById("winnerPar");


for (var i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", columnPress);
}

function columnPress() {
    if (canClick == true) {
        for (var i = this.children.length - 1; i >= 0; i--) {
            var placeToPut = this.children[i].style.backgroundColor;
            if (placeToPut == "") {
                canClick = false;
                var piece = document.createElement("div");
                piece.classList.add("piece");

                if (whoseTurn == "red") {
                    piece.style.backgroundColor = "red";
                    piece.classList.add("player1");
                }
                else {
                    piece.style.backgroundColor = "black";
                    piece.classList.add("player2");
                }

                this.appendChild(piece);
                piece.style.transform = "translateY(" + this.children[i].offsetTop + "px)";
                setTimeout(addToDiv, 2000, this.children[i], piece, this);
                // any code here will run while piece is falling
                break;
            }

        }
    }

}

function checkWin() {
    for (var i = 0; i < columns.length; i++) {
        for (var j = 0; j < columns[i].children.length; j++) {
            var rightUp3 = checkRight(i, j, -1);
            var rightStraight3 = checkRight(i, j, 0);
            var rightDown3 = checkRight(i, j, 1);
            var above3row = checkAbove(i, j);
            // var down3row = checkDown(i, j);
            // var leftUp3 = checkLeft(i, j, -1);
            // var leftStraight3 = checkLeft(i, j, 0);
            // var leftDown3 = checkLeft(i, j, 1);

            if (rightUp3 || rightStraight3 || rightDown3 || above3row) {
                winnerPar.innerHTML = whoseTurn + " Won!!!";
                turnPar.innerHTML = "";
                whoseTurn = null;
                canClick = false;
                break;
            }
        }
    }
}




function addToDiv(square, piece, column) {
    // gets called after piece is done falling
    columns.disabled = false;
    canClick = true;
    square.style.backgroundColor = piece.style.backgroundColor;
    column.removeChild(piece);
    checkWin();
    if (whoseTurn == "red") {
        whoseTurn = "black";
        turnPar.innerHTML = whoseTurn + " Turn";

    }
    else if(whoseTurn == "black"){
        whoseTurn = "red";
        turnPar.innerHTML = whoseTurn + " Turn";

    }
}

function checkRight(i, j, yDir) {
    if (yDir == -1) {
        return upDiagonal(i, j);
    }
    else if (yDir == 0) {
        return sameRow(i, j);
    }
    else {
        return downDiagonal(i, j);
    }

}







function upDiagonal(i, j) {
    var numOfTurn1 = 0;
    var origSquare = columns[i].children[j];
    var y = origSquare.getAttribute("data-y");
    y = parseInt(y);

    var columnRight = origSquare.parentElement.nextElementSibling;


    for (var k = -1; k >= -3; k--) {
        // make sure column to right
        if (columnRight) {
            var square = columnRight.children[y + k];

            if (square && square.style.backgroundColor == origSquare.style.backgroundColor && square.style.backgroundColor != "") {
                numOfTurn1++;

                if (numOfTurn1 == 3) {
                    return true
                }
            }
            else {
                return false
            }

            columnRight = columnRight.nextElementSibling;
        }
        else {
            return false;
        }
    }
}

function sameRow(i, j) {
    var numOfTurn = 0;
    var origSquare = columns[i].children[j];
    var y = origSquare.getAttribute("data-y");
    y = parseInt(y);

    var columnRight = origSquare.parentElement.nextElementSibling;
    for (var k = 1; k <= 3; k++) {
        if (columnRight) {
            var square = columnRight.children[y];

            if (square && square.style.backgroundColor == origSquare.style.backgroundColor && square.style.backgroundColor != "") {
                numOfTurn++;
                if (i == 0 && j == 5) {
                    console.log(numOfTurn);
                }
                if (numOfTurn == 3) {
                    return true;
                }
            }
            else {
                return false;
            }
            columnRight = columnRight.nextElementSibling;
        }
        else {
            return false;
        }
    }
}


function downDiagonal(i, j) {
    var numOfTurn1 = 0;
    var origSquare = columns[i].children[j];
    var y = origSquare.getAttribute("data-y");
    y = parseInt(y);

    var columnRight = origSquare.parentElement.nextElementSibling;


    for (var k = -1; k >= -3; k--) {
        // make sure column to right
        if (columnRight) {
            var square = columnRight.children[y - k];

            if (square && square.style.backgroundColor == origSquare.style.backgroundColor && square.style.backgroundColor != "") {
                numOfTurn1++;

                if (numOfTurn1 == 3) {
                    return true
                }
            }
            else {
                return false
            }

            columnRight = columnRight.nextElementSibling;
        }
        else {
            return false;
        }
    }
}

function checkAbove(i, j) {
    var numOfTurn3 = 0;
    // debugger;
    for (var q = 1; q <= 3; q++) { // loops through the squares above
        var squareAbove = getSquareAbove(columns[i].children[j], q); //calls function to get the square above
        if (i == 6 && j == 5) {}
        if (squareAbove != undefined && squareAbove.style.backgroundColor != "") { //checks if there is a square above
            var colorOfSquareAbove = squareAbove.style.backgroundColor; //finds the color of the square above
            if (colorOfSquareAbove == whoseTurn) { // 
                numOfTurn3++;
            }
        }

    }
    return numOfTurn3 == 3;
}

// function checkDown(i, j) {
//     var numOfTurn4 = 0;
//     for (var s = 1; s <= 3; s++) {
//         var squareBelow = getSquareBelow(columns[i].children[j], s);
//         if (squareBelow != undefined) {
//             var colorOfSquareBelow = squareBelow.style.backgroundColor;
//             numOfTurn4 = 0;
//             if (colorOfSquareBelow == whoseTurn) {
//                 numOfTurn4++;
//             }
//         }
//     }
//     return numOfTurn4 == 3;
// }

// function checkLeft(i, j) {
//     for (var k = 1; k <= 3; k++) {
//         for (var l = -1; l <= 1; l++) {
//             var squareToLeft = getSquareToLeft(columns[i].children[j], -k, l);
//             if (squareToLeft != undefined) {
//                 var colorOfSquareLeft = squareToLeft.style.backgroundColor;
//                 var numOfTurn5 = 0;
//                 if (colorOfSquareLeft == whoseTurn) {
//                     numOfTurn5++;
//                 }
//             }
//         }

//     }
//     return numOfTurn5 == 3;
// }
// checkLeftDiagonal:

// for (var m = -1; m < 1; m++) {
//     var squareToLeftDiagonal = getSquareToLeft(columns[i].children[j], -k, m);
//     if (squareToLeftDiagonal != undefined) {
//         var colorOfSquareLeftDiagonal = squareToLeftDiagonal.style.backgroundColor;
//         numOfTurn6 = 0;
//         if (colorOfSquareLeftDiagonal == whoseTurn) {
//             numOfTurn6++;
//         }
//         if (numOfTurn6 == 3) {
//             winnerPar.innerHTML = whoseTurn + "Wins!!!";
//         }
//     }
// }

function getSquareToLeft(square, numLeft, numBelow) {
    var column = square.parentElement;
    var columnLeft = column.previousElementSibling;

    for (var i = 1; i < numLeft; i++) {
        if (columnLeft) {
            columnLeft = columnLeft.nextElementSibling;
        }
        else {
            return null;
        }
    }

    var y = square.getAttribute("data-y");
    y = parseInt(y);
    if (columnLeft) {
        return columnLeft.children[y + numBelow];
    }
    else {
        return null;
    }
}



function getSquareToRight(square, numRight, numAbove) {
    if (square.style.backgroundColor != "") {
        var column = square.parentElement;
        var columnRight = column.nextElementSibling; // get column to right of starting
        if (numAbove == -1) {
            for (var i = -1; i >= -3; i--) {
                if (columnRight) {
                    var square = columnRight.children[y + 1]; // 1st time, get right 1, up 1
                    columnRight = columnRight.nextElementSibling; // columnRight is now next column
                }
                else {
                    return null;
                }
            }
        }
        else if (numAbove == 1) {
            for (var i = 1; i <= 3; i++) {
                if (columnRight) {
                    columnRight = columnRight.nextElementSibling.children[y - i]
                }
            }

        }
        else {
            columnRight = columnRight.nextElementSibling;
        }
        var y = square.getAttribute("data-y");
        y = parseInt(y);
        if (columnRight) {
            return columnRight.children[y + numAbove];
        }
        else {
            return null;
        }
    }
}

function getSquareAbove(square, numAbove) {
    if (square.style.backgroundColor != "") {
        var squareAbove = square.previousElementSibling;
        for (var i = 1; i < numAbove; i++) {
            if (squareAbove) {
                squareAbove = squareAbove.previousElementSibling;
            }
            else {
                return null;
            }
        }


        return squareAbove;
    }
}


function getSquareBelow(square, num) {
    var squareBelow = square.nextElementSibling;
    for (var i = 1; i < num; i++) {
        if (squareBelow) {
            squareBelow = squareBelow.nextElementSibling;
        }
        else {
            return null;
        }

    }

    return squareBelow;
}
