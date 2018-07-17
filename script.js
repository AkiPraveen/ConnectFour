// AKILESH PRAVEEN - 2018

// Global variables

var debug = false

var Player1 = 'Player 1'
var Player2 = 'Player 2'

var Player1Color = 'red'
var Player2Color = 'blue'

var table = $('table tr');

// Document Ready function

$( document ).ready(function(){
	// allow confirmation on 'enter' keypress
	var input1 = document.getElementById("player1");
	var input2 = document.getElementById("player2");

	input1.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    // trigger 'Save and close'
	    document.getElementById("dismissPlayerData").click();
	  }
	});

	input2.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    // trigger 'Save and close'
	    document.getElementById("dismissPlayerData").click();
	  }
	});


	// run the new game code
	launchNewGame()
});


// cell color setter method
function setColor(row, col, color) {
	return table.eq(row).find('td').eq(col).find('button').css('background-color', color);
}

// cell color getter method
function getColor(row, col) {
	return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

// cell color match checker
function checkColorMatch(one, two, three, four) {
	return (one === two && one === three && one === four && one != 'rgb(241, 242, 246)' && one != undefined );
}

// opens the player data modal. Is run first.
function launchNewGame(){

	// Hide game board, then show the player info modal.

	$('.gameActive').css('display', 'none')
	$('#playerInfo').modal({
	    backdrop: 'static',
	    keyboard: false
	})
}

// saves player data, calls startGame()
function updatePlayerInfo() {

	if(debug){
		alert(document.getElementById('player1').value);
	    alert(document.getElementById('player2').value);
	} 

	// assign names. if fields are left blank, keep default names.
	if(document.getElementById('player1').value != '') {
		Player1 = document.getElementById('player1').value;
	}

	if(document.getElementById('player2').value != '') {
		Player2 = document.getElementById('player2').value;
	}

	// store player colors
	Player1Color = document.getElementsByClassName('PColor')[0].value;
	Player2Color = document.getElementsByClassName('PColor')[1].value;

	if(debug) {
		console.log(Player1);
		console.log(Player2);
	}

	if(debug) alert(Player1 + ' vs. ' + Player2);


	// show the game board again
	$('.gameActive').fadeIn();

	document.getElementById('versus').innerHTML = Player1 + ' vs. ' + Player2;

	startGame();
}

// assumes player data is set, begins game.
function startGame(){

	var table = $('table tr');

	var currentPlayer = 1;
	var currentName = Player1;
	var currentColor = Player1Color;

	// Utility Functions + Win Condition Checks

	function getBottom(col) {
		var currentColor = getColor(5, col);
		for (var row=5; row > -1; row--) {
			currentColor = getColor(row, col);

			if (currentColor === 'rgb(241, 242, 246)') {
				return row;
			}
		}
	}

	function isHoriontalWin() {
		for (var row = 0; row < 6; row++) {
			for (var col = 0; col < 4; col++) {
				if(debug) {
					console.log(row + ' ' + col);
					console.log( '(' + row + ',' + col + ')' + '(' + row + ',' + (col+1) + ')' + '(' + row + ',' + (col+2) + ')'+ '(' + row + ',' + (col+3) + ')');
					console.log(getColor(row, col) + getColor(row, col+1) +  getColor(row, col+2) + getColor(row, col+3));
					console.log(checkColorMatch(getColor(row, col), getColor(row, col+1), getColor(row, col+2), getColor(row, col+3)));
					console.log(checkColorMatch(getColor(5,0) , getColor(5,1), getColor(5,2), getColor(5,3)));
				}
				if (checkColorMatch(getColor(row, col), getColor(row, col+1), getColor(row, col+2), getColor(row, col+3))) {
					
					
					if(debug) console.log('horizontal win found');
					if (debug) reportWin(row, col);
					if(debug) console.log(getColor(row, col) +  getColor(row, col+1) + getColor(row, col+2) + getColor(row, col+3));
					return true;
				} 
				else {
					
					continue;
				}
			}
		}

		return false;
	}

	function isVerticalWin() {
		for (var col=0; col < 7; col++) {
			for (var row=0; row < 3; row++) {
				if (checkColorMatch(getColor(row,col), getColor(row+1,col), getColor(row+2, col), getColor(row+3, col))) {
					console.log('vertical win found');
					reportWin(row,col);
					return true;
				}
				else {
					continue;
				}
			}
		}
	}

	function isDiagonalWin() {
		for (var col=0; col < 5; col++) {
			for (var row=0; row < 7; row++) {
				if (checkColorMatch(getColor(row, col), getColor(row+1, col+1), getColor(row+2, col+2), getColor(row+3, col+3))) {
					console.log('diagonal win found');
					reportWin(row, col);
					return true;
				} else if (checkColorMatch(getColor(row, col), getColor(row-1, col+1), getColor(row-2, col+2), getColor(row-3, col+3))) {
					console.log('diagonal win found');
					reportWin(row, col);
					return true;
				} else {
					continue;
				}
			}
		}
	}

	// game logic

	$('h3').text(Player1+", your turn! Pick a column!")

	// first, fill an available circle.

	$('.board button').on('click', function() {
		
		var col = $(this).closest('td').index();

		var bottomAvailable = getBottom(col);

		setColor(bottomAvailable, col, currentColor);

		// if a win is found

		if(isHoriontalWin() || isVerticalWin() || isDiagonalWin()) {
			$('.versus').text(currentName+', you win!')
			$('h3').fadeOut()
			$('.gameActive').css('pointer-events', 'none')
			$('.again').fadeIn()
		}

		currentPlayer = currentPlayer * -1;

		if(currentPlayer === 1) {
			currentName = Player1;
			$('h3').text(currentName+', your turn.')
			currentColor = Player1Color;
		} else {
			currentName = Player2;
			$('h3').text(currentName+', your turn.')
			currentColor = Player2Color;
		}

	})
}

// Simple printing function
function reportWin(row, col){
	console.log('You won at (row, col)');
	console.log(row);
	console.log(col);
}