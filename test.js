function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.color = color;
	this.update = function(){
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	this.clicked = function() {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var clicked = true;
		if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
			clicked = false;
		}
		return clicked;
	

	}

}


function textComponent(width, height, color, x, y, text) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.text = text;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.font = "Consolas";
		ctx.fillStyle = color;
		ctx.fillText(this.text, this.x, this.y);
	}

}


var redGamePiece, greenGamePiece;
//var myScore =
var num_correct;
var prev_choice_correct;
var component_array = [];
var actual_score = 0;
var displayed_score = 0;
var stored_clicks = [];
var trials_corr_inc = [];
var num_trials = 0;
var instr0 = 'instructions 0';
var instr1 = 'instructions 1';
var instr2 = 'instructions 2';
var instruction_set;
var pointText = new textComponent("30px", "30px", "black", 200, 200, " ");

/*
function showTemporarily(msg, location, duration) {
				// msg is a string to display
				// location is a DOM element to hold the message
				// duration is the number of milliseconds to display the message
				location.innerHTML = msg;
				let timeout = setTimeout(function () {
								location.innerHTML = '';
				}, duration);
};
*/
/*
function sleep(milliseconds) {
				const date = Date.now();
				let currentDate = null;
				do {
								currentDate = Date.now();
									  } while (currentDate - date < milliseconds);
				//myGameArea.clear();
}
*/
//console.log("Hello");
//sleep(2000);
//console.log("World!");
/*
function sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedGreeting() {
				component_array = [];
				//updateGameArea();
				//var mySound = document.getElementById('sound');
				//mySound.play();
				//pointText.text = "+1 point";

				//console.log("Hello");
				await sleep(2000);

				// await for 2 seconds then continue with program, set up a one square
				//console.log("World!");
				//setuponesquare();
}
*/
//delayedGreeting();
//console.log("Goodbye!");


function setuponesquare() {
	//alert('in setup one');
	//alert(component_array.length + 'len comp arra')
	
	if (component_array.length == 0 || component_array[0].clicked() || component_array[1].clicked()) {
			if (component_array.length > 0) {
					var iclicked;
					num_trials += 1;
					console.log('num trials is ' + num_trials);
					if (component_array[0].clicked()) {iclicked = 0}
					else {iclicked = 1}
					stored_clicks.push(iclicked);
					if (component_array[iclicked].color == myGameArea.clicked_color) {
							alert('correct color chosen')
							actual_score += 1;
							trials_corr_inc.push(1);
													
					}
					else {
							alert('incorrect color chosen')
							trials_corr_inc.push(0);
					}
					if (!(trials_corr_inc.length == 1)) {
							if ((trials_corr_inc[trials_corr_inc.length - 2]) == 1) {
									//updateGameArea();
									//myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
									//redGamePiece.clearRect();
									//greenGamePiece.clearRect();
									//delayedGreeting();
									var mySound = document.getElementById('sound');
									mySound.play();
									//pointText.text = "+1 point";
									displayed_score += 1
									myGameArea.myScore.text = "TOTAL SCORE: " + displayed_score;
									//document.getElementById('point') = pointText.text;
									showTemporarily(pointText.text = '+1 point', document.getElementById('point'), 2000);
									pointMessage.remove();


									//delayedGreeting();
									//showTemporarily('+1 point', location, 2000);

									//for (var x of component_array) {
										//			x.x = 1000;
									//}
                  //component_array = [];
									//alert('ran if statment going onto sleep function next');
									//showTemporarily('+1 point', location, 2000);

									//myGameArea.clear();
									//updateGameArea();
							}
					}
			}
					//setuponesquare_part2();
	

	
				//setuponesquare_part2();

		// three brackets and setuponesquare_part2();
//sleep(2000);
//setuponesquare();
//setuponesquare_addition();

/*function setuponesquare_part2(){
	 if (component_array.length == 0 && num_trials > 1){

					 sleep(2000);
	 }
*/

//function setuponesquare_part2() {
				//sleep(2000);


    if (num_trials < 5) {

		component_array = [];
		var random_color = Math.floor(Math.random() * 2);
		if (random_color == 0) {
			redGamePiece = new component(30, 30, "red", 10, 120);
			component_array.push(redGamePiece);
		}
		else {
			greenGamePiece = new component(30, 30, "green", 50, 120);
			component_array.push(greenGamePiece);
		}
		updateGameArea();
		myGameArea.step = 2;
		}
		else {
			alert('5 trials done');
            updateGameArea();
		}
	}
}



function setuptwosquares() {
	pointText.text = " ";
	//alert("in setup two");
	if (component_array[0].clicked()) {
		alert(component_array[0].color+' was clicked');
		myGameArea.clicked_color = component_array[0].color;
		component_array = [];
		//clicked_color_array = [];
		redGamePiece = new component(30, 30, "red", 10, 120);
			component_array.push(redGamePiece);
			greenGamePiece = new component(30, 30, "green", 50, 120);
			component_array.push(greenGamePiece);
		updateGameArea();
		myGameArea.step = 1;
	}
}


var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 480;
		this.canvas.height = 270;
		//this.canvas.style.cursor = "none"; //hide the original cursor
		this.context = this.canvas.getContext("2d");
		//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		//document.body.insertBefore(this.canvas, document.body.lastChild.nextSibling);
		document.body.insertBefore(this.canvas, null);
		this.frameNo = 0;

		var random_instr = Math.floor(Math.random()*3);
		if (random_instr == 0) {
				document.getElementById('instructions').innerHTML = instr0;
				instruction_set = 0;
		}
		else if (random_instr == 1) {
				document.getElementById('instructions').innerHTML = instr1;
				instruction_set = 1;
		}
		else {
				document.getElementById('instructions').innerHTML = instr2;
				instruction_set = 2;
		}
		alert('stored instruction' + instruction_set);

		myGameArea.myScore = new textComponent("30px", "30px", "black", 400, 70, "TOTAL SCORE: 0");		

		myGameArea.step = 1;
		myGameArea.clicked_color;
		
		window.addEventListener('mousedown', function (e) {
				myGameArea.x = e.clientX;
				myGameArea.y = e.clientY;

				if (component_array.length == 0) {
						var mes = document.getElementById('welcome');
						var mes2 = document.getElementById('message');
						var mes3 = document.getElementById('messageBegin');
						
						mes.remove();
						mes2.remove();
						mes3.remove();
						document.getElementById('instructions').remove();
				}

				if (num_trials < 5) {
						if (myGameArea.step == 1) {
								setuponesquare();
						}
						else {
								setuptwosquares();
						}
				}
		})


		//})
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}


function updateGameArea() {
	myGameArea.clear();
	for (var x of component_array) {
		x.update();
	}
	if (component_array.length > 0) {
			myGameArea.myScore.update();
	}
	pointText.update();
}

//alert("start of program");
//console.log("Hello");
myGameArea.start();
//setuponesquare();
updateGameArea();
//myScore.update();
