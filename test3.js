function component(width, height, color, x, y, bar){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.color = color;
	this.bar = bar;
	this.update = function(){
		ctx = myGameArea.context;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI, false);
		ctx.lineWidth = 3;
		ctx.fillStyle = color;
		//ctx.strokeStyle = '#FF0000';
		ctx.fill();

         if (this.bar){
		    ctx.fillStyle = 'Black';
		    ctx.fillRect(this.x-this.width, this.y, this.width*2, this.height*.2); 
		 }
	}
	
	this.clicked = function() {
		var myleft = this.x-this.width;
		var myright = this.x + (this.width);
		var mytop = this.y-this.width;
		var mybottom = this.y + (this.width);
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
		ctx.font = "15px Consolas";
		//ctx.fontSize = "50px";
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
var pointText = new textComponent("50px", "50px", "black", screen.width/2, screen.height/2, " ");
var makeSquare = 1; // is a flag, set to true
// added variable for timesetout function 1/16/21
var gameStarted = 1;
const mySound = document.getElementById("sound");


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
							//alert('correct color chosen')
							actual_score += 1;
							trials_corr_inc.push(1);
														//myGameArea.pointText.text = "+1 point";
					}
					else {
							//alert('incorrect color chosen')
							trials_corr_inc.push(0);
					}
					if (!(trials_corr_inc.length == 1)) {
							if ((trials_corr_inc[trials_corr_inc.length - 2]) == 1) {
									mySound.play();
									pointText.text = "+1 point";
									displayed_score += 1
									myGameArea.myScore.text = "TOTAL SCORE: " + displayed_score; 
									makeSquare = 0; // set to false bc want the delay where squares are not made
							}
					}
					
			}

		//console.log(stored_clicks + 'x' + trials_corr_inc);

		//myGameArea.myScore.text = "SCORE: ";
		/*var i;
		for (i = 0; i < component_array.length; i++) {
			if (component_array[i].clicked() == 0) {
				alert('red was clicked')
			}
			else if (component_array[i].clicked() == 1) {
				alert('green was clicked')
			}
			else {
				alert('start of program again')
			}
		}*/
		//alert('one of the colors was clicked')
	
		

        component_array = [];

	    if (num_trials < 5) {
			
			//component_array = [];
			//if (makeSquare == 0) {
			//	alert("makeSquare");
			//	setTimeout(function () {alert("after time");}, 5000);				
			//	makeSquare = 1;
			//}
			if (makeSquare == 1) {	// so correct color was not chosen and make the squares without any delay or point showing		
				var random_color = Math.floor(Math.random() * 2);
				if (random_color == 0) {
					redGamePiece = new component(screen.width/40, screen.height/40, "red", screen.width/2, screen.height/2, true);
					component_array.push(redGamePiece);
				}
				else {
					greenGamePiece = new component(screen.width/40, screen.height/40, "green", screen.width/2, screen.height/2, false);
					component_array.push(greenGamePiece);
				}
			}
			else {
					gameStarted = 0;

					setTimeout(function() { // use setTimeout to have a delay before running this code to set up component arrays

                    pointText.text = " ";
					gameStarted = 1;
					var random_color = Math.floor(Math.random() * 2);
					if (random_color == 0) {
						redGamePiece = new component(screen.width/40, screen.height/40, "red", screen.width/2, screen.height/2, true);
						component_array.push(redGamePiece);
					}
					else {
						greenGamePiece = new component(screen.width/40, screen.height/40, "green", screen.width/2, screen.height/2, false);
						component_array.push(greenGamePiece);
					}

					updateGameArea();
					//gameStarted = 1;
					myGameArea.step = 2;


				}, 2000);

			}

			updateGameArea();
			//pointText.text = " ";
			myGameArea.step = 2;
			//gameStarted = 1;
			makeSquare = 1; // set makesquare back to true
			//gameStarted = 1;
		}
			//
		else {
			if (makeSquare == 1) {
					setupEndScreen();
			}
			else{		
            setTimeout(setupEndScreen, 2000);
			}
				
			updateGameArea();

		}


	}


	

			//myGameArea.start();
	


		//updates....
	        /*for (var j of component_array) {
			if (myGameArea.mousex == component_array[j].mousex && myGameArea.mousey == component_array[j].mousey) {
				alert('it worked')
			}
		}*/
	



	//myGameArea.start();
}

function setupEndScreen() {
	component_array = [];
	pointText.text = " ";
	document.getElementById('Thank you').innerHTML = "Thank you for participating";
    updateGameArea();
}

function setuptwosquares() {
	pointText.text = " ";
	//alert("in setup two");
	if (component_array[0].clicked()) {
		//alert(component_array[0].color+' was clicked');
		myGameArea.clicked_color = component_array[0].color;
		component_array = [];
		//clicked_color_array = [];
		redGamePiece = new component(screen.width/40, screen.height/40, "red", screen.width/3, screen.height/2, true);
			component_array.push(redGamePiece);
			greenGamePiece = new component(screen.width/40, screen.height/40, "green", screen.width*(2/3), screen.height/2, false);
			component_array.push(greenGamePiece);
		updateGameArea();
		myGameArea.step = 1;
	}
}



/*function afterselecting() {
	if (component_array[0].clicked() || component_array[1].clicked()) {
		setupNewSquares();
	}*/




/*function setupcolors() {
	redGamePiece = new component(30, 30, "red", 10, 120);
	greenGamePiece = new component(30, 30, "green", 50, 120);
	//myGameArea.start();

}*/


var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = screen.width;
		this.canvas.height = screen.height;
		//this.canvas.style.cursor = "none"; //hide the original cursor
		this.context = this.canvas.getContext("2d");
		//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		//document.body.insertBefore(this.canvas, document.body.lastChild.nextSibling);
		document.body.insertBefore(this.canvas, null);
		this.frameNo = 0;

		//var thanks = 		

		var random_instr = Math.floor(Math.random()*3)
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
		//alert('stored instruction' + instruction_set)	

		myGameArea.myScore = new textComponent("30px", "30px", "black", screen.width*(2/3), screen.height/4, "TOTAL SCORE: 0");		
		//myGameArea.pointText = new textComponent("30px", "30px", "black", 200, 200);

		myGameArea.step = 1;
		myGameArea.clicked_color;
		//if (num_trials < 5) {

	    //if (gameStarted == 1) {	
		window.addEventListener('mousedown', function (e) {
				myGameArea.x = e.pageX;
				myGameArea.y = e.pageY;

				if (gameStarted == 1) {
				if (component_array.length == 0 && num_trials == 0) {
						var mes = document.getElementById('welcome');
						var mes2 = document.getElementById('message');
						var mes3 = document.getElementById('messageBegin');
						//instructionMessage = Instructions;
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
				}
				
				

		})
		
		
			
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		//this.context.fillStyle = "#FFF0F0";
		//this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
}


function updateGameArea() {
	myGameArea.clear();
	for (var x of component_array) {
		x.update();
	}
	if (num_trials > 0 || component_array.length > 0) {
			//if (!(trials_corr_inc.length == 1)) {
			//if ((trials_corr_inc[trials_corr_inc.length - 2] == 1)) {
			
			myGameArea.myScore.update();
	}
	pointText.update();


	
	/*for (var i of clicked_color_array) {
		i.update();
	}*/

	
	/*for (var j of two_array) {
		j.update();
	}*/
	//redGamePiece.update();
	//greenGamePiece.update();




	
}

//alert("start of program");
//console.log("Hello");
myGameArea.start();
//setuponesquare();
updateGameArea();
//myScore.update();
