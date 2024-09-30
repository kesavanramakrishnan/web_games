const canvas = document.getElementById("canvas")
const box = document.getElementById("box")
const newCity = document.getElementById("newCity")
const city1Input = document.getElementById("city1Input")
const city2Input = document.getElementById("city2Input")
const pathButton = document.getElementById("pathButton")
const pathsBox = document.getElementById("pathsBox")
const showAllCheckbox = document.getElementById("showAllCheckbox")
const sacButton = document.getElementById("sacButton")
const bayAreaBut = document.getElementById("bayAreaBut")



let map = {}
let context = canvas.getContext(`2d`)
let startCity;
let currentShort;
let justShown = false;
let curSac = false;
let curBay = false;
let sacDict = {}
let bayDict = {}



showAllCheckbox.addEventListener(`click`, showSolutions)
canvas.addEventListener(`mousedown`, placeCity)
pathButton.addEventListener(`click`, startFinding)
sacButton.addEventListener(`click`, createSac)
bayAreaBut.addEventListener(`click`, createBay)


function placeCity(event) {
	solutions = []
	pathsBox.innerHTML = ""
  const cityName = newCity.value
	console.log(currentShort)
	if(currentShort){
	drawShortest(currentShort, "white", "10")
	drawShortest(currentShort, "black", "1")
	}
	currentShort = undefined;
	newCity.value = ""
  if (cityName && map[cityName] == undefined) {
    map[cityName] = [{ positionX: event.offsetX, positionY: event.offsetY }]
    let circle = createCircle(event, cityName)
    box.appendChild(circle)
    if (curSac) {
      sacDict[cityName] = circle
    } else if (curBay) {
      bayDict[cityName] = circle
    }
    box.appendChild(createLabel(event, cityName))
    return circle
  }
}


function createSac() {
		solutions = []
	pathsBox.innerHTML = ""
  curSac = true;
  clearCanvas()
  let array = []
  sacDict = {}
  newCity.value = "Sacramento"
  array.push(placeCity({ offsetX: 51.5, offsetY: 331.5 }))
  newCity.value = "North Highlands"
  array.push(placeCity({ offsetX: 138.5, offsetY: 175.5 }))
  newCity.value = "Citrus Heights"
  array.push(placeCity({ offsetX: 262.5, offsetY: 126.5 }))
  newCity.value = "Roseville"
  array.push(placeCity({ offsetX: 318.5, offsetY: 71.5 }))
  newCity.value = "Rocklin"
  array.push(placeCity({ offsetX: 394.5, offsetY: 26.5 }))
  newCity.value = "Folsom"
  array.push(placeCity({ offsetX: 441.5, offsetY: 218.5 }))
  newCity.value = "Fair Oaks"
  array.push(placeCity({ offsetX: 331.5, offsetY: 250.5 }))
  newCity.value = "Rancho Cordova"
  array.push(placeCity({ offsetX: 207.5, offsetY: 331.5 }))
  curSac = false
  for (const city in sacDict) {
    if (city != "Sacramento") {
      sacDict[city].click()
      sacDict[city].click()
    } else {
      sacDict[city].click()
    }
  }
  array[0].click()
  sacDict["North Highlands"].click()
  sacDict["Rancho Cordova"].click()
  sacDict["Rancho Cordova"].click()
  sacDict["Citrus Heights"].click()
  sacDict["Citrus Heights"].click()
  sacDict["Fair Oaks"].click()
  sacDict["Fair Oaks"].click()
  sacDict["Roseville"].click()
}

function createBay(){
		solutions = []
	pathsBox.innerHTML = ""
	curBay = true
	clearCanvas()
  let array = []
	bayDict = {}

	newCity.value = "San Francisco"
	array.push(placeCity({ offsetX: 51.5, offsetY: 68.5 }))
	newCity.value = "Oakland"
		array.push(placeCity({ offsetX: 134.5, offsetY: 26.5 }))
	newCity.value = "Hayward"
		array.push(placeCity({ offsetX: 246.5, offsetY: 99.5 }))
	newCity.value = "Fremont"
		array.push(placeCity({ offsetX: 355.5, offsetY: 191.5 }))
	newCity.value = "San Jose"
		array.push(placeCity({ offsetX: 441.5, offsetY: 331.5 }))
	newCity.value = "Mountain View"
		array.push(placeCity({ offsetX: 293.5, offsetY: 310.5 }))
	newCity.value = "Palo Alto"
		array.push(placeCity({ offsetX: 201.5, offsetY: 270.5 }))
	newCity.value = "San Mateo"
		array.push(placeCity({ offsetX: 95.5, offsetY: 190.5 }))
	curBay = false

	 for (const city in bayDict) {
    if (city != "San Francisco") {
      bayDict[city].click()
      bayDict[city].click()
    } else {
      bayDict[city].click()
    }
  }
	  array[0].click()
		bayDict["Hayward"].click()
		bayDict["San Mateo"].click()
		bayDict["Fremont"].click()
		bayDict["Palo Alto"].click()

}


function connect() {
  if (justShown) {
    unhilightCity()
		if(currentShort){
    drawShortest(currentShort, "white", "10")
    drawShortest(currentShort, "black", "1")
		}
    startCity = null
    justShown = false;
  }
  if (startCity) {
    let exists = false
    for (let i = 1; i < map[startCity.dataset.name].length; i++) {
      if (map[startCity.dataset.name][i].to == this.dataset.name) {
        exists = true
      }
    }
    if (!exists) {
      context.beginPath()
      context.moveTo(map[startCity.dataset.name][0].positionX + 7.5, map[startCity.dataset.name][0].positionY + 7.5)
      context.lineTo(map[this.dataset.name][0].positionX + 7.5, map[this.dataset.name][0].positionY + 7.5)
      context.lineWidth = "1"
      context.strokeStyle = "black"
      context.stroke()
      createConnection(startCity.dataset.name, this.dataset.name)
      startCity.style.backgroundColor = "black"
      startCity = null;
    } else {
      startCity.style.backgroundColor = "black"
      startCity = this;
      this.style.backgroundColor = "rebeccapurple"
    }
  } else {
    startCity = this;
    this.style.backgroundColor = "rebeccapurple"
  }
}

function createConnection(start, end) {
  const dist = Math.floor(Math.sqrt(Math.pow((map[start][0].positionX - map[end][0].positionX), 2) + Math.pow((map[start][0].positionY - map[end][0].positionY), 2)))
  map[start].push({ to: end, distance: dist })
  map[end].push({ to: start, distance: dist })
}

function createCircle(coords, cName) {
  unhilightCity()
  if(currentShort){
    drawShortest(currentShort, "white", "10")
    drawShortest(currentShort, "black", "1")
		}
  startCity = null;
  let div = document.createElement("div")
  div.classList.add("circle")
  div.style.top = `${coords.offsetY}px`
  div.style.left = `${coords.offsetX}px`
  div.addEventListener(`click`, connect)
  div.dataset.name = cName
	map[cName].city = div;
  return div
}
function createLabel(coords, name) {
  let label = document.createElement("div")
  label.classList.add("cityLabel")
  label.style.top = `${coords.offsetY + 20.5}px`
  label.innerHTML = name
  const positionInfo = label.getBoundingClientRect()
  label.style.left = `${coords.offsetX /*- (positionInfo.width/2)*/}px`
  return label
}

let solutions = []


function startFinding() {
  solutions = []
  startCity = null;
  if (map[city1Input.value] && map[city2Input.value]) {
    findPaths(city1Input.value, [], 0, city2Input.value)
  }
  showSolutions()
}

function findPaths(toCity, pathSet, traveled, target) {
  let newPath = pathSet.slice()
  newPath.push(toCity)
  if (toCity == target) {
    solutions.push({ distance: traveled, path: newPath })
  } else {
    for (let i = 1; i < map[toCity].length; i++) {
      if (!newPath.includes(map[toCity][i].to)) {
        let newTraveled = traveled + map[toCity][i].distance
        findPaths(map[toCity][i].to, newPath, newTraveled, target)
      }
    }
  }
}


function showSolutions() {
  pathsBox.innerHTML = ""
		unhilightCity()
		//context.clearRect(0, 0, canvas.width, canvas.height)
		console.log(map)
		if(currentShort){
		drawShortest(currentShort, "white", "10")
    drawShortest(currentShort, "black", "1")
		}
  if (solutions.length != 0) {
    let short = { distance: Number.MAX_SAFE_INTEGER };
    for (let i = 0; i < solutions.length; i++) {
      if (solutions[i].distance < short.distance) {
        short = solutions[i]
      }
    }
    let div = document.createElement("div")
    div.classList.add("selected");
    div.classList.add("path")
    for (let city of short.path) {
      div.innerHTML += `${city} - `
    }
    div.innerHTML += ` (${short.distance})`
    div.style.color = "rebeccapurple"
    div.style.fontWeight = "bold"
    pathsBox.appendChild(div)
    justShown = true
		console.log(short.path)
    drawShortest(short.path, "rebeccapurple", "5")
    currentShort = short.path
    if (showAllCheckbox.checked) {
      for (let solution of solutions) {
        if (solution != short) {
          let div = document.createElement("div")
          div.classList.add("path")
          div.style.color = "black"
          for (let city of solution.path) {
            div.innerHTML += `${city} - `
          }
          div.innerHTML += ` (${solution.distance})`
          pathsBox.appendChild(div)
        }
      }
    }
  } else {
		console.log("here")
    pathsBox.innerHTML = "No path found."
  }
}

function drawShortest(path, color, width) {
  let first = false;
  let previous;
  if (path) {
    for (let city of path) {
      if (color == "rebeccapurple")
        hilightCity(city)
      if (!first) {
        previous = city
        first = true;
      } else {
        context.beginPath()
        context.moveTo(map[previous][0].positionX + 7.5, map[previous][0].positionY + 7.5)
        context.lineTo(map[city][0].positionX + 7.5, map[city][0].positionY + 7.5)
        context.strokeStyle = color
        context.lineWidth = width
        context.stroke()
        previous = city;
      }
    }
  }
}


function hilightCity(cityName) {
  let cities = document.querySelectorAll(".circle")
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].dataset.name == cityName) {
      cities[i].style.backgroundColor = "rebeccapurple"
    }
  }
}


function unhilightCity() {
  let cities = document.querySelectorAll(".circle")
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].style.backgroundColor == "rebeccapurple") {
      cities[i].style.backgroundColor = "black"
    }
  }
}


function clearCanvas() {
  for (let child of box.querySelectorAll("div")) {
    child.remove()
  }

  context.clearRect(0, 0, canvas.width, canvas.height)
  map = {}
	currentShort = undefined
  // box.innerHTML = ""
  // let newCanvas = document.createElement("CANVAS");
  // newCanvas.style.backgroundColor = "white"
  // newCanvas.style.height = "400px"
  // newCanvas.style.width = "500px"
  // box.appendChild(newCanvas)
  // canvas = newCanvas
  // context = newCanvas.getContext(`2d`)
}
