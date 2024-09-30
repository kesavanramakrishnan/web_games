const numOfSquares = document.getElementById("numOfSquares")
const enterBut = document.getElementById("enterBut")
const holder = document.getElementById("holder")
const solP = document.getElementById("solP")

enterBut.addEventListener("click", generateBoard)

// jump(0th square)

// example board
// 3 0 0 1 End

let board = []
let possible = false

function generateBoard() {
	holder.innerHTML = ""
	solP.innerHTML = ""
	board = []
	possible = false
	let length = parseFloat(numOfSquares.value)
	if (length >= 1 && length <= 25) {
		for (let i = 0; i < length - 1; i++) {
			board.push(Math.floor(Math.random() * 4))
		}
		board.push("End")
		jump(0, [0]);
		if (!possible) {
			create([]);
		}
	} else {
		holder.innerHTML = "Number of squares must be between 1 and 25."
	}
}

function jump(toSq, sequence) {
	if (board[toSq] && !possible) {
		if (board[toSq] != "End") {
			for (let i = board[toSq]; i >= 1; i--) {
				let newSequence = sequence.slice(0)
				newSequence.push(toSq + i)
				jump(toSq + i, newSequence)
			}
		} else {
			possible = true
			sequence.push(toSq);
			create(sequence)
			return;
		}
	}

}

function create(indices) {
	let counter = 0;
	holder.innerHTML = "";
	for (let i = 0; i < board.length; i++) {
		let div = document.createElement("div");
		div.classList.add("square");
		div.innerHTML = board[i];
		if (i == indices[counter]) {
			counter++
			div.style.backgroundColor = "purple";
		}
		holder.appendChild(div);
	}
	if (indices[0] == undefined) {
		solP.innerHTML = "No solution"
	} else {
		solP.innerHTML = "Solution hilighted in purple"
	}
}