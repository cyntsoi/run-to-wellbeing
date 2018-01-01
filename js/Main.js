
var canvas, canvasContext;


// start indicates if the start Page is shown
var start = true


// defines runners
var guy = new runnerClass();
var girl = new runnerClass();

// defines players
var player1 = new playerClass();
var player2 = new playerClass();

// indicates if final quest / win screen  is shown 
var showFinalQuest=false;
var showWinScreen= false;


//shows time spent on each side
var time = 0;
var minutes = (Math.floor(time/60) < 10) ? '0' + Math.floor(time/60).toString() : Math.floor(time/60).toString()
var seconds = (time % 60 < 10) ? '0' + (time % 60).toString() : (time % 60).toString();

// defines winner at the end of each game
var winner;

window.onload = function() {
	//main panel
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// shows when images are loading
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	
	// left panel
	p1canvas = document.getElementById('p1Canvas');
	p1ctx = p1canvas.getContext('2d');
	
	// right panel
	p2canvas = document.getElementById('p2Canvas');
	p2ctx = p2canvas.getContext('2d');
	
	p1ctx.fillStyle = 'black';
	p1ctx.fillRect(0,0, p1canvas.width,p1canvas.height)
	
	p2ctx.fillSTyle = 'black';
	p2ctx.fillRect(0,0, p2canvas.width,p2canvas.height)

	
	loadImages();
}

function playButtonAudio(){
	var newButtonAudio = new Audio("sounds/button.mp3");
	newButtonAudio.volume = .5;
	newButtonAudio.load()
	newButtonAudio.play();
	
	}

function loadSound(){
	winMusicAudio = new Audio("sounds/winbackground.mp3")
	winMusicAudio.loop=true;
	winMusicAudio.volume=.5;
	winMusicAudio.load();
	
	backgroundAudio = new Audio("sounds/bgmusic.mp3") 
	backgroundAudio.loop = true;
	backgroundAudio.volume = .25;
	backgroundAudio.load()
	
	buttonAudio = new Audio("sounds/button.mp3");
	buttonAudio.volume = .5;
	buttonAudio.load()
	
	
	winAudio = new Audio("sounds/win.mp3");
	winAudio.volume = .5;
	winAudio.load()
	}

function playAnswerAudio(state,qstate){
	if(qstate>0){ return}
	var answerAudio
	if (state){
		answerAudio = new Audio("sounds/right.mp3")
		}else{
			answerAudio = new Audio("sounds/wrong.mp3")
			}
	answerAudio.volume = .5;
	answerAudio.load();
	answerAudio.play();
	}

function imageLoadingDoneSoStartGame() {
	
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	setInterval(timer,1000)
	
	setupPlayer();
	setupInput();
	loadSound();
	loadArena();
}
// counts time once the game started
function timer(){
	if(!start){
		time+=1
		minutes = (Math.floor(time/60) < 10) ? '0' + Math.floor(time/60).toString() : Math.floor(time/60).toString()
    	seconds = (time % 60 < 10) ? '0' + (time % 60).toString() : (time % 60).toString();
	}
	
	}
// set up quest box coordinates for each player
// to use this information , use runner.quests[*quest box number*][0:check if the quest is completed/1: quest box coordinates/2: opened or not, used for loading quest box images]
function setupBoxes() {
	girl.setupBoxes([[false,[3,2],0],[false,[6,2],0],[false,[3,9],0],[false,[1,12],0]]);
	guy.setupBoxes([[false,[16,2],0],[false,[10,2],0],[false,[11,11],0],[false,[17,8],0]]);
} 

// loads arena
function loadArena() {
	trackGrid = arena.slice();
		for (i=261;i<269;i++){
			trackGrid[i] = 1
			}
		for (i=270;i<279;i++){
			trackGrid[i] = 1
			}
	
	setupBoxes();
	player1.reset();
	player2.reset();
	girl.reset(player1,girlPic,[redbox1,redbox2,redbox3], "Girl",[girlUp,girlDown]);
	guy.reset(player2,guyPic,[bluebox1,bluebox2,bluebox3], "Guy",[guyUp,guyDown]);
}

function updateAll() {
	updateLocks();
	moveAll();
	drawAll();
	player1.update();
	player2.update();
}

// checks if the player has completed all quests. If so, his/her side of the goal will be unlocked.
function checkLock(player){
	for (i=0;i<4;i++){
		if(!player.questCompleted[i]){return}
		}
		
	player.unlocked = true
	if (player == player1){
		for (i=261;i<269;i++){	
			trackGrid[i] = 8	
				}
		} else {
			for (i=270;i<279;i++){
			trackGrid[i] = 8	
				}
			} 
	}

function updateLocks(){
	checkLock(player1);
	checkLock(player2);
	}

function moveAll() {
	guy.move();
	girl.move();
}

function drawQuest(){
	player1.drawQuest();
	player2.drawQuest();
	}
	
function drawInstr(){
	player1.drawInstr();
	player2.drawInstr();
	}


function drawAll() {
	
	// draws final or win screen	
	
	if(showFinalQuest || showWinScreen){
			canvasContext.clearRect(0,0,canvas.width,canvas.height);
		if(showFinalQuest){
			canvasContext.drawImage(finalQuest,0,0);
			} else {
				if (winner == player1){
					winScreen.src = "images/" + winSet[0]
					}else{
					winScreen.src="images/" + winSet[1]	
						}
			canvasContext.drawImage(winScreen,0,0);
			var source = winner.runner.imgSet[winner.runner.location][0]
				winner.myPlayerPic.src = "images/characters_L/" + source
				drawBitmapCenteredWithRotation(canvasContext,winner.myPlayerPic, 400,300, 0)
				}
		return;}
	
	// draw tracks
	drawTracks();
	
	// draw quest boxes
	guy.drawBoxes();
	girl.drawBoxes();
	canvasContext.textAlign='right';
	
	// name and id
	canvasContext.fillText('by cin ting tsoi',canvas.width-10 ,15)
	canvasContext.fillText('20592092',canvas.width-10 ,30)
	
	// runners
	guy.draw();
	girl.draw();
	
	// player panels
	player1.draw();
	player2.draw();
	
	// images on top of runners
	canvasContext.drawImage(trackPics[TRACK_WALL],12*40,6*40)
	canvasContext.drawImage(trackPics[TRACK_WALL],9*40,6*40)
	canvasContext.drawImage(trackPics[TRACK_WALL],6*40,6*40)
	canvasContext.drawImage(mtoiletPic,10*40,6*40)
	canvasContext.drawImage(ftoiletPic,7*40,6*40)
	canvasContext.drawImage(trackPics[TRACK_WALL],0,7*40)
	
	// quest on player panels
	drawQuest();
	
	// instructions for new players
	drawInstr();
	if(start){
		canvasContext.drawImage(startPage,0,0);
		}
		
} 

