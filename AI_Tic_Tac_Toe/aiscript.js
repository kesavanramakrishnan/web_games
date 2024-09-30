let squares = document.querySelectorAll(".square")
let restartButton = document.getElementById("restartButton")
let switchButton = document.getElementById("switchButton")
let outcomePar = document.getElementById("outcomePar")
let youPar = document.getElementById("youParagraph")
let compPar = document.getElementById("compParagraph")

restartButton.addEventListener("click", restartGame)
switchButton.addEventListener("click", changeCharacter)

for (let square of squares) {
	square.addEventListener("click", playerMove)
}



let gameOver = false
let playerTurn = true;
let playerChar = "X"
let compChar = "O"
let grid = ["", "", "", "", "", "", "", "", ""]



// function move():
//   highestScore = -Infinity

//   for each possible next move:
//     score = getScore(nextMove, true)

//     if score > highestScore:
//       bestMove = nextMove

// function getScore(move, computerTurn):
//   if game is over:
//     return score of game state
//   else:
//     if computerTurn:
//       strongestScore = Infinity

//       for each possible next move:
//         score = getScore(nextMove, false)
//         strongestScore = min(score, strongestScore)

//       return strongestScore
//     else:
//       strongestScore = -Infinity

//       for each possible next move:
//         score = getScore(nextMove, true)
//         strongestScore = max(score, strongestScore)

//       return strongestScore



function playerMove() {
	if (playerMove && this.innerHTML == "" && evaluateGrid(grid) == "F") {
		playerTurn = false
		var position = this.dataset.index
		grid[position] = playerChar
		this.innerHTML = playerChar
		let result = evaluateGrid(grid)
		if (evaluateGrid(squares) == playerChar) {
			endGame(playerChar)
		}else if(evaluateGrid(grid) == "T"){
			endGame("T")
		}
		compMove()
	}else if(evaluateGrid(grid) == "T"){
		endGame("T")
	}
}


function compMove() {
	let highestScore = -Infinity
	let bestMove;
	for (let i = 0; i < grid.length; i++) {
		if (grid[i] == "") {
			let score = getScore(grid, i, true)
			if (score > highestScore) {
				highestScore = score;
				bestMove = i;
			}
		}
	}
	//console.log(highestScore, bestMove)
	if(bestMove != undefined){
	grid[bestMove] = compChar
	squares[bestMove].innerHTML = compChar
	playerTurn = true
	}
	if(evaluateGrid(grid) == compChar){
		endGame(compChar)
	}else if(evaluateGrid(grid) == "T"){
		endGame("T")
	}
}


function getScore(board, move, compTurn) {
	let newGrid = board.slice()
	if (compTurn) {
		newGrid[move] = compChar
	} else {
		newGrid[move] = playerChar
	}
	let result = evaluateGrid(newGrid)
	//console.log(result, new)
	if (result == playerChar) {
		return -10
	} else if (result == compChar) {
		return 10
	} else if (result == "T") {
		return 0
	} else {

		if (compTurn) {
			let strongestScore = Infinity
			for (let i = 0; i < newGrid.length; i++) {
				if (newGrid[i] == "") {
					let score = getScore(newGrid, i, false)
					if (score < strongestScore) {
						strongestScore = score
					}
				}
			}
			return strongestScore
		} else {
			let strongestScore = -Infinity
			for (let i = 0; i < newGrid.length; i++) {
				if (newGrid[i] == "") {
					let score = getScore(newGrid, i, true)
					//console.log(score)
					if (score > strongestScore) {
						strongestScore = score
					}
				}
			}
			return strongestScore
		}
	}
}




// [[0, 1, 2], [4, 5, 6], [7, 8, 9]]
//   X  X  
function evaluateGrid(grid) {
	// console.log(grid)
	if (grid[0] == "X" && grid[1] == "X" && grid[2] == "X" ||
		grid[3] == "X" && grid[4] == "X" && grid[5] == "X" ||
		grid[6] == "X" && grid[7] == "X" && grid[8] == "X" ||
		grid[0] == "X" && grid[4] == "X" && grid[8] == "X" ||
		grid[2] == "X" && grid[4] == "X" && grid[6] == "X" ||
		grid[0] == "X" && grid[3] == "X" && grid[6] == "X" ||
		grid[1] == "X" && grid[4] == "X" && grid[7] == "X" ||
		grid[2] == "X" && grid[5] == "X" && grid[8] == "X") {
		//console.log("The X PLAYER WON");
		return "X";
	}
	else if (grid[0] == "O" && grid[1] == "O" && grid[2] == "O" ||
		grid[3] == "O" && grid[4] == "O" && grid[5] == "O" ||
		grid[6] == "O" && grid[7] == "O" && grid[8] == "O" ||
		grid[0] == "O" && grid[4] == "O" && grid[8] == "O" ||
		grid[2] == "O" && grid[4] == "O" && grid[6] == "O" ||
		grid[0] == "O" && grid[3] == "O" && grid[6] == "O" ||
		grid[1] == "O" && grid[4] == "O" && grid[7] == "O" ||
		grid[2] == "O" && grid[5] == "O" && grid[8] == "O") {
		//console.log("The O PLAYER WON");
		return "O";
	}
	else {
		var noBlanks = 0;
		for (var i = 0; i < grid.length; i++) {
			if (grid[i] != "") {
				noBlanks++;
			}
		}
		// console.log(noBlanks)
		if (noBlanks == 9) {
			// console.log("TIE GAME")
			return "T";
		}

	}
	return "F"
}

function changeCharacter(){
	let holder = playerChar
	playerChar = compChar
	compChar = holder
	restartGame();
	youPar.innerHTML = `You: ${playerChar}`
	compPar.innerHTML = `Computer: ${compChar}`
	if(playerChar == "O"){
		console.log("here")
	switchButton.innerHTML = "Let yourself go first"
	}else{
		switchButton.innerHTML = "Let computer go first"
	}
}

function restartGame(){
	outcomePar.innerHTML = ""
	grid = ["", "", "", "", "", "", "", "", ""];
	for(let i = 0; i < squares.length; i++){
		squares[i].innerHTML = "";
	}
	if(compChar == "X"){
		compMove()
		playerTurn = false
	}
}


function endGame(winner){
	if(winner == "T"){
		outcomePar.innerHTML = "Tie Game"
	}else{
	outcomePar.innerHTML = `Player ${winner} Won!`
	}
}