const expression = document.getElementById("expression")
const parseBut = document.getElementById("parseBut")
const solP = document.getElementById("solP")

expression.addEventListener("keyup", function(event) {
    //event.preventDefault();
    if (event.keyCode === 13) {
        parse();
    }
});

parseBut.addEventListener("click", parse)
let sequence = [];


function parse() {
	solP.innerHTML = ""
	sequence = []
	let newExpression = expression.value.split(" ").join("")
	let result = divide(newExpression)
	if(result){
	solP.innerHTML = result
	}else{
		solP.innerHTML = "Invalid Expression"
	}

}

// divide takes in a string, and returns an array of terms+operators
// evaluate takes in a term, and returns a number
// divide calls evalulate many times (once per term)

// ex: (1+2)*5
// divide takes in (1+2)*5
// divide calls evalulate on (1+2)
// evaluate sees that (1+2) is not a number, so it calls divide(1+2)
// START RECURSION
// divide takes in (1+2)
// divide calls evaluate on 1
// evaluate sees that 1 is a number, so it returns 1
// divide calls evaluate on 2
// evaluate sees that 2 is a number, so it returns 2
// divide returns [1, +, 2]

function divide(string) {
	// ex: 1+2
	// loop through string and eventually return: [1, +, 2]
	// call eval on that, and it returns 3
	// ex: (1+2)*5
	// loop through string but you find (1+2)
	// call divide again, which will return [1, +, 2]
	// call some eval function that will turn that array into 3
	// call divide again on 3*5, which returns [3, *, 5]
	// call eval on that, and it returns 15

	// ex: (1+2)*5

	// call divide("((1/3)+2)*5")
	// if no recursion, returns ["((1/3)+2)", "*", "5"]
	// call evaluate("((1/3)+2)"), evalulate("5")

	// call divide("((1/3)+2)")
	// returns ["(1/3)", "+", "2"]
	// call evaluate("(1/3)", evaluate("2")

	// call divide ("1/3")
	// returns ("1", "/", "3")
	// call evaluate("1"), evaluate("3")

	// etc.
	let expression = []
	let operators = 0
	let current = ""
	for (let i = 0; i < string.length; i++) {
		if ("0123456789.".includes(string[i])) {
			current += string[i];
			if (i == string.length - 1) {
				expression.push(current)
			}
		} else if ("+-/*".includes(string[i])) {
			expression.push(current, string[i])
			operators++
			current = ""
		} else if ("(".includes(string[i])) {
			let object = stripParentheses(string.substring(i))
			current = object.word
			i += object.end
			if(i == string.length - 1){
				expression.push(current)
			}
		}else{
			invalidExpression()
			return;
		}

	}
	if(operators == expression.length - operators - 1){
	return evaluate(expression);
	}else{
		invalidExpression();
	}
}

function stripParentheses(string) {
	let counter = 1
	let end;
	for (let i = 1; i < string.length; i++) {
		if (string[i] == "(") {
			counter++
		} else if (string[i] == ")") {
			counter--
			if (counter == 0) {
				end = i;
				break;
			}
		}
	}
	return { word: string.substring(1, end), end: end}
}

function evaluate(array) {
	let result = 0;
	if (!isNaN(array[0])) {
		result = parseFloat(array[0])
	} else {
		result = divide(array[0])
	}
	for (let i = 2; i < array.length; i += 2) {
		if (isNaN(array[i])) {
			array[i] = divide(array[i])
		}
		if (array[i - 1] == "+") {
			result += parseFloat(array[i])
		} else if (array[i - 1] == "-") {
			result -= parseFloat(array[i])
		} else if (array[i - 1] == "/") {
			result /= parseFloat(array[i])
		} else {
			result *= parseFloat(array[i])
		}
	}
	return result;
}

function invalidExpression() {
	solP.innerHTML = "Invalid Expression"
}





/*
sample expressions:
1: 1
1+1: 2
1+1*2: 4
11+22: 33
1+(2*3): 7
1+(2*(3-1)+1)-(6-(2/3))*((4)) -> 1 + 5 - 5.33 * 4 -> 2.668
   terms:
   1 -> 1
   2*(3-1)+1 -> 2*2+1 -> 5
      terms:
      2
      3-1 -> 2
        terms:
        3
        1

        operators:
        -
      1

      operators:
      *
      +
   6-(2/3) -> 6 - 0.667
      terms:
      6
      2/3 -> 0.667
        terms:
        2
        3

        operators:
        /

      operators:
      -
   (4) ->
      4 -> 4

   operators:
   +
   -
   *
*/