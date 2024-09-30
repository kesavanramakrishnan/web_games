const letters = document.getElementById("letters")
const solP = document.getElementById("solP")
const grid = document.getElementById("grid")
const squares = document.querySelectorAll(".square")

letters.addEventListener("input", changed)

// let counter = 0;
let possible = false;
let lettersU = ""
function changed() {
  solP.style.visibility = "hidden"
  lettersU = letters.value.toUpperCase()
  // counter = 0
  possible = false
  unhilight()
  for (let i = 0; i < squares.length; i++) {
    searchWords(squares[i], i, [], 0)
  }
  if (!possible) {
    hilight([])
  }
}

function searchWords(toSq, position, sequence, count) {
  if (toSq && !possible && !sequence.includes(toSq)) {
    //console.log(toSq, toSq.innerHTML, lettersU[count])
    if (toSq.innerHTML == lettersU[count]) {
      let newSequence = sequence.slice()
      newSequence.push(toSq)
      if (count != lettersU.length - 1) {
        count++
        searchWords(squares[position + 5], position + 5, newSequence, count)
        searchWords(squares[position - 5], position - 5, newSequence, count)
        searchWords(squares[position + 1], position + 1, newSequence, count)
        searchWords(squares[position - 1], position - 1, newSequence, count)
      } else {
        hilight(newSequence)
        possible = true
      }
    }
  }
}

function hilight(squaresArr) {
  if (squaresArr[0]) {
    for (let i = 0; i < squaresArr.length; i++) {
      squaresArr[i].classList.add("hilighted")
    }
  } else {
    solP.style.visibility = "visible"
  }
}
function unhilight() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains("hilighted")) {
      squares[i].classList.remove("hilighted")
    }
  }
}


