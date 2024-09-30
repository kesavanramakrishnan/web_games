var submittedPar = document.getElementById("submitPar");
var averagePar = document.getElementById("averagePar");
var highPar = document.getElementById("highPar");
var lowPar = document.getElementById("lowPar");
var highLow = document.getElementById("highLow");
var inputNums = document.getElementById("number");
var findAv = document.getElementById("average");
var scores = [];
var submit = document.getElementById("submit");
var highest;
var lowest;


findAv.addEventListener("click", getAv);
submit.addEventListener("click", submitNums);
highLow.addEventListener("click", findHighLow);


function submitNums() {
    if (inputNums.value != "") {
        scores.push(parseFloat(inputNums.value));
        submittedPar.innerHTML = submittedPar.innerHTML + inputNums.value + ", ";

        if (scores.length == 1) {
            highest = parseFloat(inputNums.value);
            lowest = parseFloat(inputNums.value);
        }
        if (inputNums.value > highest) {
            highest = parseFloat(inputNums.value);
        }
        if (inputNums.value < lowest) {
            lowest = parseFloat(inputNums.value);
        }
    }
}

function getAv() {
    if (scores.length != 0) {
        var sum = 0;
        for (var i = 0; i < scores.length; i++) {
            sum = sum + scores[i];

        }
        averagePar.innerHTML = "Average: " +  sum / scores.length;
    }
}

function findHighLow() {
    if (highest != undefined) {
        highPar.innerHTML = "Highest Number: " + highest;
        lowPar.innerHTML = "Lowest Number: " + lowest;
    }
}
