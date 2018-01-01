const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;


var arena =  [ 1, 1, 1, 5, 5, 5, 5, 5, 5, 4, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1,
				 1, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1,
				 1, 2, 0, 0, 0, 4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 2, 1,
				 1, 1, 1, 4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 1, 1, 1,
				 1, 1, 1, 0, 0, 4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 1, 1, 1,
				 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 10, 10, 10, 10, 10, 10, 0, 0, 1, 0, 0, 9, 9, 9, 9, 9, 9, 9, 1,
				 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1,
				 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1,
				 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1,
				 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1,
				 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1,
				 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1,
				 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1];



var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_SHELF = 4;
const TRACK_FLAG = 5;
const TRACK_BLACK = 6;
const TRACK_RUNMACHINE = 7;
const TRACK_WATER = 8;
const TRACK_ROLLLEFT =9
const TRACK_ROLLRIGHT =10

var questions=[[],[],[],[]]



function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < TRACK_COLS &&
		row >= 0 && row < TRACK_ROWS) {
		 var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		 return trackGrid[trackIndexUnderCoord];
	} else {
		return TRACK_WALL;
	}
}

var runners = [];
var numbers = [];

// quest box openning animation
function setopenbox(){
	var runner = runners [0]
	var number = numbers[0]
	runner.quests[number][2] = 2
	var newrunners = runners.slice(1,runners.length);
	runners = newrunners
	var newnumbers = numbers.slice(1,numbers.length);
	numbers = newnumbers
	freezeRunner4Quest(runner,number);
	}
	
// freeze runner movement for quest
function freezeRunner4Quest(runner,questno){
	runner.freeze=true;
	runner.player.currentQuest=questno
	runner.player.questON = true;
	runner.player.freezeFactor=0;
	runner.player.freezeQuest=true;
	runner.player.startQuest();
	
	}

function runnerTrackHandling(whichRunner) {
	var runnerTrackCol = Math.floor(whichRunner.x / TRACK_W);
	var runnerTrackRow = Math.floor(whichRunner.y / TRACK_H);
	var trackIndexUnderRunner = rowColToArrayIndex(runnerTrackCol, runnerTrackRow);
	
	if (runnerTrackRow >= 7){whichRunner.location=1} else {whichRunner.location=0}

	if(runnerTrackCol >= 0 && runnerTrackCol < TRACK_COLS &&
		runnerTrackRow >= 0 && runnerTrackRow < TRACK_ROWS) {
		
		var tileHere = returnTileTypeAtColRow( runnerTrackCol,runnerTrackRow );
		
		
		for (i=0;i<4;i++){
			var boxTrackIndex = rowColToArrayIndex(whichRunner.quests[i][1][0],whichRunner.quests[i][1][1]) 
			if (trackIndexUnderRunner == boxTrackIndex && !whichRunner.quests[i][0]){
				whichRunner.quests[i][0] = true;
				whichRunner.quests[i][2] = 1;
				
				runners[runners.length] = whichRunner
				numbers[numbers.length] = i
				
				setTimeout(function(){setopenbox()},350);
				
				}
			}
		
		// activate final quest once a player reaches goal
		if(tileHere == TRACK_GOAL) {
			if(!showFinalQuest && !showWinScreen){
				backgroundAudio.pause();
				winMusicAudio.play();
				winAudio.play();}
			winner = whichRunner.player;
			showFinalQuest = true
			
		} else if(tileHere == TRACK_WATER){ // reduce runner speed in water
			whichRunner.speed = whichRunner.speed *0.88
			whichRunner.y *= 0.995
			
			if(whichRunner.player.firstinwater){ 
			// display instruction in water the for 4 seconds since the runner first touches water
				whichRunner.player.displaywaterinstr = true;
				whichRunner.player.firstinwater=false
			if (whichRunner == guy){
				setTimeout(function(){player2.displaywaterinstr = false},4000)
				} else {
					setTimeout(function(){player1.displaywaterinstr = false},4000)
					}
			}
			
		} else if(tileHere == TRACK_ROLLLEFT){
			// move runner to the left on ROLLLEFT tracks
			whichRunner.x *= 0.995
		} else if(tileHere == TRACK_ROLLRIGHT){
			// move runner to the right on ROLLRIGHT tracks
			whichRunner.x *= 1.03
			}	else if(tileHere != TRACK_ROAD){
			whichRunner.x -= Math.cos(whichRunner.ang) * whichRunner.speed;
			whichRunner.y -= Math.sin(whichRunner.ang) * whichRunner.speed;

			whichRunner.speed *= -0.5;
		} // end of track found
	} // end of valid col and row
} // end of runnerTrackHandling func


function rowColtoXY(col,row){
	var x = col*TRACK_W+TRACK_W/2;
	var y = row*TRACK_H+TRACK_H/2;
	
	return [x,y];	
	}

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}

var movecount = 0

function drawTracks() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = trackGrid[arrayIndex];
			var useImg = trackPics[tileKindHere];

			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += TRACK_W;
			arrayIndex++;
			
			// drawing animated ROLLLEFT/ ROLLRIGHT tracks
			
			if (tileKindHere == TRACK_ROLLLEFT){
				canvasContext.drawImage(arrowleftPic,drawTileX - arrowleftPic.width - movecount * TRACK_W, drawTileY)
				}
				
			if (tileKindHere == TRACK_ROLLRIGHT){
				canvasContext.drawImage(arrowrightPic,drawTileX -TRACK_W - arrowrightPic.width + movecount * TRACK_W, drawTileY)
				}
			
		} // end of for each col
		drawTileY += TRACK_H;
		drawTileX = 0;
	} // end of for each row
	if (movecount<1){
	movecount += 0.05} else {
	movecount = 0	
		}

	canvasContext.drawImage(trackPics[TRACK_ROAD],11*40,7*40)

		
} // end of drawTracks func