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


function textComponent(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	//this.text = "TOTAL SCORE: ";
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
var score_increment = 0;
var stored_clicks = [];
var trials_corr_inc = [];
var num_trials = 0;
var instr0 = 'instructions 0';
var instr1 = 'instructions 1';
var instr2 = 'instructions 2';
var instruction_set;


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
							score_increment += 1;
							trials_corr_inc.push(1);
							var pointText = new textComponent("30px", "30px", "black", 200, 200);
							pointText.text = "+1 point";
							//myGameArea.pointText.text = "+1 point";
					}
					else {
							alert('incorrect color chosen')
							trials_corr_inc.push(0);
					}
					if (!(trials_corr_inc.length == 1)) {
							if ((trials_corr_inc[trials_corr_inc.length - 2]) == 1) {
									alert('+1 point');
									
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
		else {alert('5 trials done')}

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


function setuptwosquares() {
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
		this.canvas.width = 480;
		this.canvas.height = 270;
		//this.canvas.style.cursor = "none"; //hide the original cursor
		this.context = this.canvas.getContext("2d");
		//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		//document.body.insertBefore(this.canvas, document.body.lastChild.nextSibling);
		document.body.insertBefore(this.canvas, null);
		this.frameNo = 0;

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
		alert('stored instruction' + instruction_set)

		myGameArea.myScore = new textComponent("30px", "30px", "black", 400, 70);		
		//myGameArea.pointText = new textComponent("30px", "30px", "black", 200, 200);

		myGameArea.step = 1;
		myGameArea.clicked_color;
		//if (num_trials < 5) {
		window.addEventListener('mousedown', function (e) {
				myGameArea.x = e.clientX;
				myGameArea.y = e.clientY;

				if (component_array.length == 0) {
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
				//else{alert('5 trials has ended')}
		
		//else {alert('5 trials has ended')}
		


			/*if (component_array[0].clicked()) {
				alert(component_array[0].color+' was clicked');
				setuptwosquares();
			}*/
				//updateGameArea();
			
				/*if (component_array[0].clicked() || component_array[1].clicked()) {
					setupNewSquares();
				}*/
			
			//afterselecting();
			//updateGameArea();

			
			
			

			//setuptwosquares();
			//setuptwosquares();
		//setuptwosquares();
			//`setuptwosquares();
			    			    


			//setuptwosquares();
			//updateGameArea();


		})
		
			
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
			myGameArea.myScore.text = "TOTAL SCORE: " + score_increment; 
			myGameArea.myScore.update();
	}
	
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
