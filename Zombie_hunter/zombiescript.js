document.addEventListener("keydown", keyPressed);
var towerPar = document.getElementById("towerPar");
var winLosePar = document.getElementById("winLosePar");
var towerLives = 25;
var gameOver = false;
var livesPar = document.getElementById("livesPar");
var pointsPar = document.getElementById("pointsPar");
var numOfPoints = 0;
var moveZomb = null;
var character = document.getElementById("character");
var gameBox = document.getElementById("gameBox");
var lazer = document.getElementById("lazer");

var numOfLives = 6;
var allZombs = document.querySelectorAll(".zombieClone");
var zombMake = setInterval(anoZomb, 1000);
var lazerInterval = null;

var firstZomb = document.querySelector(".zombieClone");
setInterval(moveOneZombie, 200, firstZomb);

function keyPressed(event) {
    if (gameOver == false) {
        if (character.offsetLeft < 650) {
            if (event.keyCode == 68) {
                character.style.left = (character.offsetLeft + 5) + "px";
            }
        }
        if (character.offsetLeft > 0) {
            if (event.keyCode == 65) {
                character.style.left = (character.offsetLeft - 5) + "px";
            }
        }
        if (event.keyCode == 32) {
            if (lazerInterval == null) {
                whereShooting();
                lazerInterval = setInterval(shooting, 100);
            }
        }

    }
}


function whereShooting() {
    lazer.style.display = "initial";
    lazer.style.left = (character.offsetLeft + 25) + "px";

}

function shooting(event) {
    if (lazer.offsetLeft < 650) {
        lazer.style.left = (lazer.offsetLeft + 5) + "px";
        allZombs = document.querySelectorAll(".zombieClone");
        for (var i = 0; i < allZombs.length; i++) {
            if (allZombs[i].offsetLeft < (lazer.offsetLeft + 50) && (allZombs[i].offsetLeft + 50) > (lazer.offsetLeft + 50)) {
                allZombs[i].style.display = "none";
                clearInterval(lazerInterval);
                lazer.style.display = "none";
                lazerInterval = null;
                numOfPoints++;
                pointsPar.innerHTML = "Points =" + numOfPoints;
                if (numOfPoints == 100) {
                    why();
                }
            }
        }

    }
    else {
        clearInterval(lazerInterval);
        lazer.style.display = "none";
        lazerInterval = null;
    }
}




function anoZomb() {
    var firstZombieOnPage = gameBox.querySelectorAll(".zombieClone")[0];
    var zombieClone = firstZombieOnPage.cloneNode(true);
    zombieClone.style.display = "inherit";
    zombieClone.style.left = "650px";
    document.getElementById("gameBox").appendChild(zombieClone);
    moveZomb = setInterval(moveOneZombie, 200, zombieClone);
    allZombs = document.querySelectorAll(".zombieClone");
}

function moveOneZombie(zombie) {
    if (gameOver == false) {
        if (zombie.offsetLeft > 100) {
            zombie.style.left = (zombie.offsetLeft - 5) + "px";

        }
        else {
            towerDie(zombie);
        }



        if (zombie.offsetLeft < (character.offsetLeft + 50) && (zombie.offsetLeft + 50) > (character.offsetLeft + 50)) {
            numOfLives = numOfLives - 1;
            livesPar.innerHTML = " Lives: " + numOfLives;

            if (numOfLives <= 0) {
                lose();
                clear();

            }
        }

    }
}

function why() {
    winLosePar.innerHTML = "You're so pathetic why would you play for so long?";
    winLosePar.style.fontSize = "50px";
    gameOver = true;
    clear();
}

function clear() {
    clearInterval(zombMake);
    clearInterval(moveZomb);
    clearInterval(lazerInterval);
}

function towerDie(zombie) {
    if (zombie.offsetLeft == 100) {
        towerLives = towerLives - 1;
        towerPar.innerHTML = "Tower Life:" + towerLives;
        gameBox.removeChild(zombie);

    }
    if (towerLives <= 0) {
        clear();
        lose();
    }
}

function lose() {
    gameOver = true;
    winLosePar.innerHTML = "You Lose!!!";
    winLosePar.style.fontSize = "50px";
}
