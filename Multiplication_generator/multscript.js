var numOfRows = document.getElementById("numberOfRows");
var numOfColumns = document.getElementById("numberOfColumns");
var firstRowNum = document.getElementById("firstRowNumber");
var firstColumnNum = document.getElementById("firstColumnNumber")
var generateButton = document.getElementById("generateButton");
var box = document.getElementById("box");


generateButton.addEventListener("click", generateTable);




function generateTable() {
    box.innerHTML = "";
    for (var i = firstColumnNum.value; i < parseFloat(numOfColumns.value) + parseFloat(firstColumnNum.value); i++) {
        for (var j = firstRowNum.value; j < parseFloat(numOfRows.value) + parseFloat(firstRowNum.value); j++) {
            var div = document.createElement("div");
            div.classList.add("box");
            box.appendChild(div);
            div.innerHTML = i * j;
            if (i == j) {
                div.style.backgroundColor = "white";
                div.style.color = "blue";
            }
            div.style.left = ((i * 50) + 50 - (parseFloat(firstColumnNum.value) * 50)) + "px";
            div.style.top = ((j * 50) + 50 - (parseFloat(firstRowNum.value) * 50)) + "px";
        }

    }
    for (var i = parseFloat(firstRowNum.value); i < parseFloat(numOfRows.value) + parseFloat(firstRowNum.value); i++) {
        var div = document.createElement("div");
        div.classList.add("numberBoxes");
        box.appendChild(div);
        div.style.top = ((i * 50) + 72 - (parseFloat(firstRowNum.value) * 50)) + "px";
        div.innerHTML = i;
    }
    for (var i = parseFloat(firstColumnNum.value); i < parseFloat(numOfColumns.value) + parseFloat(firstColumnNum.value); i++) {
        var div = document.createElement("div");
        div.classList.add("numberBoxes");
        box.appendChild(div);
        div.style.left = ((i * 50) + 72 - (parseFloat(firstColumnNum.value) * 50)) + "px";
        console.log(parseFloat(firstColumnNum.value));
        div.innerHTML = i;
    }

}
