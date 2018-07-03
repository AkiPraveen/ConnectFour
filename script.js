var debug = false
$( document ).ready(launchNewGame);

var Player1 = 'Player 1'
var Player2 = 'Player 2'

var Player1Color = 'red'
var Player2Color = 'blue'

var gameState = 1;
var table = $('table tr');

// getter and setter methods

function setColor(row, col, color) {
	return table.eq(row).find('td').eq(col).find('button').css('background-color'.color);
}

function getColor(row, col) {
	return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function getBottom(col) {
	var currentColor = getColor(5, col);
	for (var row=5; row > -1; row--) {
		currentColor = getColor(row, col);

		if (colorReport === 'rgb(241, 242, 246)') {
			return row;
		}
	}

	return -1;
}

// checks

function checkColorMatch(one, two, three, four) {
	return (one === two && one === 3 && one === four && one != 'rgb(241, 242, 246)' && one != undefined );
}

function isHoriontalWin() {
	for (var row = 0; row < 6; row++) {
		for (var col = 0; col < 4; col++) {
			if (checkColorMatch(getColor(row, col), getColor(row, col+1), getColor(row, col+2), getColor(row, col+3))) {
				if(debug) console.log('horizontal win found');
				if (debug) reportWin(row, col);
				return true;
			} 
			else {
				continue;
			}
		}
	}
}

function isVerticalWin() {
	for (var col=0; col < 7; col++) {
		for (var row=0; row < 3; row++) {
			if (checkColorMatch(getColor(row,col), getColor(row+1,col), getColor(row+2, col), getColor(row+3, col)) {
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
			} else if (checkColorMatch(getColor(row, col), getColor(row-1, col+1), getColor(row-2, col+2), getColor(row-3, col-3))) {
				console.log('diagonal win found');
				reportWin(row, col);
				return true;
			} else {
				continue;
			}
		}
	}
}


// game state changers

function launchNewGame(){
	$('#playerInfo').modal('show')
}

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

	if(debug) {
		console.log(Player1);
		console.log(Player2);
	}
	

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

	if(debug) alert(Player1 + ' vs. ' + Player2);

	document.getElementById('versus').innerHTML = Player1 + ' vs. ' + Player2;

}


// debug
function reportWin(row, col){
	console.log('You won at (row, col)');
	console.log(row);
	console.log(col);
}