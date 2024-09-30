var boxes = document.querySelectorAll(".box");
var compSolve = document.getElementById("solver");
var winPar = document.getElementById("winPar");
var numsInBox = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var selected;



compSolve.addEventListener("click", solveItLater);

function solveItLater() {
    setTimeout(solveIt, 10);
}

for (var i = 0; i < numsInBox.length; i++) {
    boxes[i].addEventListener("click", select);
}


for (var i = 0; i < numsInBox.length; i++) {
    boxes[i].innerHTML = numsInBox[i];
}

function select() {
    if (!selected) {
        this.classList.add("boxesStyle");
        selected = this;
    }
    else {
        swap(selected, this);
        selected = null;
        didYouWin();
    }


}

function didYouWin() {
    if (parseFloat(boxes[0].innerHTML) + parseFloat(boxes[1].innerHTML) + parseFloat(boxes[2].innerHTML) == 15 &&
        parseFloat(boxes[3].innerHTML) + parseFloat(boxes[4].innerHTML) + parseFloat(boxes[5].innerHTML) == 15 &&
        parseFloat(boxes[6].innerHTML) + parseFloat(boxes[7].innerHTML) + parseFloat(boxes[8].innerHTML) == 15 &&
        parseFloat(boxes[0].innerHTML) + parseFloat(boxes[4].innerHTML) + parseFloat(boxes[8].innerHTML) == 15 &&
        parseFloat(boxes[2].innerHTML) + parseFloat(boxes[4].innerHTML) + parseFloat(boxes[6].innerHTML) == 15 &&
        parseFloat(boxes[0].innerHTML) + parseFloat(boxes[3].innerHTML) + parseFloat(boxes[6].innerHTML) == 15 &&
        parseFloat(boxes[1].innerHTML) + parseFloat(boxes[4].innerHTML) + parseFloat(boxes[7].innerHTML) == 15 &&
        parseFloat(boxes[2].innerHTML) + parseFloat(boxes[5].innerHTML) + parseFloat(boxes[8].innerHTML) == 15) {
        youWin();
        return true;
    }
    else {
        return false;
    }
}

function youWin() {
   compSolve.disabled = true;
    winPar.innerHTML = "You Win!!!!";
}



function swap(square1, square2) {
    var extraCup = square2.innerHTML;
    square1.classList.remove("boxesStyle");
    square2.innerHTML = square1.innerHTML;
    square1.innerHTML = extraCup;
}

function solveIt() {
    while (!didYouWin()) {
        var number1 = Math.floor(Math.random() * boxes.length);
        var number2 = Math.floor(Math.random() * boxes.length);
        swap(boxes[number1], boxes[number2]);
    }
    compWin();
}

function compWin() {
    winPar.innerHTML = "THE COMPUTER WINS!!!!";
}
