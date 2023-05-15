/* PLAN
 * Specify matrix size
 * Create 2d array
 * * Insert values
 * * Assign to gen 1 2d array *DONE
 * Evolve
 * * Create 2d array gen 2
 * * Evolution formula ready
 * * * Insert values
 * * * Replace gen 2 with gen 1
 * Evolve
 */

// 1. Generation 1
// a. Assign your matrix dimensions here
const X_VALUE = 3;
const Y_VALUE = 3;
//let MATRIX_TABLE = document.getElementById("matrixTable");

// Button click
// const button = document.getElementById("generateButton");
// button.addEventListener("click", (event) => {
// 	MATRIX_TABLE.innerHTML = ``;
// 	// matrixGen1 = bufferMatrix;
// 	// buffer = [];
// 	renderHTMLGrid(bufferMatrix, X_VALUE, Y_VALUE);
// 	console.log("buffer rendered");
// 	evolveLoop(matrixGen1, bufferMatrix, X_VALUE, Y_VALUE);
// });

// a. Make an empty 2D matrix
function generateEmptyMatrix(rowCount, colCount) {
	let arr = [];
	for (let i = 0; i < rowCount; i++) {
		arr[i] = [];
		for (let j = 0; j < colCount; j++) {
			arr[i][j] = 0;
		}
	}
	return arr;
}
// let matrixGen1 = generateEmptyMatrix(X_VALUE, Y_VALUE);
/* TEST CONDITION BELOW */
let matrixGen1 = [
	[1, 0, 1],
	[0, 1, 1],
	[1, 1, 0],
];
console.log("TEST MATRIX");
console.table(matrixGen1);

// // b. Assign random starting values
// function assignRandomValues(arr, rowCount, colCount) {
// 	for (let i = 0; i < rowCount; i++) {
// 		for (let j = 0; j < colCount; j++) {
// 			arr[i][j] = Math.round(Math.random());
// 		}
// 	}
// 	return arr;
// }
// assignRandomValues(matrixGen1, X_VALUE, Y_VALUE);
// console.log("This is the Gen 1 matrix:");
// console.table(matrixGen1);

// c. Pushing to HTML
// renderHTMLGrid(matrixGen1, X_VALUE, Y_VALUE);
// function renderHTMLGrid(matrix, rowCount, colCount) {
// 	for (let i = 0; i < rowCount; i++) {
// 		MATRIX_TABLE.innerHTML += `<br>`;
// 		for (let j = 0; j < colCount; j++) {
// 			MATRIX_TABLE.innerHTML += `<div class="matrixCell">${matrix[i][j]}</div>`;
// 		}
// 	}
// }

// 2. Generation 2
// a. Create buffer Matrix (https://www.cs.cornell.edu/courses/cs4620/2019fa/cs4621/lecture07/exhibit01.html)
let bufferMatrix = generateEmptyMatrix(X_VALUE, Y_VALUE);

// b. Loop evolutionProcess over each item in old matrix
function evolveLoop(oldArr, newArr, rowCount, colCount) {
	for (let i = 0; i < rowCount; i++) {
		for (let j = 0; j < colCount; j++) {
			let prevCellStatus = oldArr[i][j];
			let neighborCount = countNeighbors(oldArr, i, j);
			let newValue = newCellStatus(prevCellStatus, neighborCount);
			newArr[i][j] = newValue;
			// /* TESTING UPDATED VALUE BELOW. OUTPUT BAD */
			// console.log(newCellStatus(prevCellStatus, neighborCount));
		}
	}

	return newArr;
}
console.log("This is the Buffer Matrix:");
evolveLoop(matrixGen1, bufferMatrix, X_VALUE, Y_VALUE);
console.table(bufferMatrix);

// Zintis suggested optional chaining. This checks if the value exists before accessing it. It prevents undefined and other errors.
// The order of x and y here are inconsistent. I think the sub-arrays need to be restructured, x first then y.
function countNeighbors(arr, xValue, yValue) {
	const neighborCells = [
		arr?.[xValue - 1]?.[yValue - 1],
		arr?.[xValue - 1]?.[yValue],
		arr?.[xValue - 1]?.[yValue + 1],
		arr?.[xValue]?.[yValue - 1],
		/* 		arr?.[xValue]?.[yValue], */
		arr?.[xValue]?.[yValue + 1],
		arr?.[xValue + 1]?.[yValue - 1],
		arr?.[xValue + 1]?.[yValue],
		arr?.[xValue + 1]?.[yValue + 1],
	];
	// Filter for edge cases here
	let filteredNeighbors = neighborCells.filter((x) => typeof x === "number");
	let finalValue = filteredNeighbors.reduce((a, c) => a + c, 0);
	return finalValue;
}

/* let newValue = 1;
 * function, takes prevCellStatus and neighborCount, and outputs newValue
 */

function newCellStatus(prevCellStatus, neighborCount) {
	/* TESTING: PROBLEMS HAPPEN AROUND HERE */
	if (prevCellStatus === 1) {
		if (neighborCount === 2 || neighborCount === 3) {
			return 1;
		} else {
			return 0;
		}
	} else {
		if (neighborCount === 3) {
			return 1;
		} else {
			return 0;
		}
	}
}
