const GROUNDSPEED_DECAY_MULT = 0.89;
const DRIVE_POWER = 0.7;
const moveBackward_POWER = 0.2;
const TURN_RATE = 0.045;
const MIN_SPEED_TO_TURN = 0;


function runnerClass() {
	this.x = 75;
	this.y = 75;
	this.ang = 0;
	this.speed = 0;
	this.myRunnerPic; // which picture to use
	this.imgSet;
	this.name = "Untitled Runner";
	
	this.location = 0; // wears gym wear if location = 0, else wears swimsuit
	
	this.walkState = 0; // runner stands if walkState =0, runner walks otherwise
	this.walkCount =0; // time between moving the other arm and leg
	
	this.player;
	
	this.box; // quest box locations
	this.quests;

	this.freeze = true; // runner freezes when freeze = true

	this.keyHeld_moveForward = false;
	this.keyHeld_moveBackward = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}
	
	this.setupBoxes = function(list){
		this.quests=list;
		}

	this.reset = function(player,whichImage,box, runnerName,imgSet) { // reset runner
		this.x = 75;
		this.y = 75;
		this.ang = 0;
		this.player = player;
		this.name = runnerName;
		this.myRunnerPic = whichImage;
		this.speed = 0;
		this.box = box;
		this.imgSet = imgSet;
		
		this.keyHeld_moveForward = false;
		this.keyHeld_moveBackward = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;


		for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					if (this==girl){
					this.ang = 0;} else {this.ang = Math.PI}
					this.x = eachCol * TRACK_W + TRACK_W/2;
					this.y = eachRow * TRACK_H + TRACK_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
	} // end of runnerReset func

	this.move = function() {
		
		if (this.freeze){
			return} // does move when freeze = true
		this.speed *= GROUNDSPEED_DECAY_MULT;

		if(this.keyHeld_moveForward) {
			this.speed += DRIVE_POWER;
		}
		if(this.keyHeld_moveBackward) {
			this.speed -= moveBackward_POWER;
		}
		if(Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
			if(this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
			}
			if(this.keyHeld_TurnRight) {
				this.ang += TURN_RATE;
			}
		}

		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;
		runnerTrackHandling(this);
	}

	this.draw = function() {
		if (this.speed<0.2){ // runner stands
			this.walkState =0
			}else if(this.walkCount>40){ // switches leg and arm when walking
				this.walkCount = 0
				if (this.walkState ==1){this.walkState=2} else {this.walkState =1}
				} else { // increases walkcount until switching leg and arm again
					this.walkCount += Math.abs(this.speed);
					}
		this.myRunnerPic.src = "images/characters/"+this.imgSet[this.location][this.walkState]
		drawBitmapCenteredWithRotation(canvasContext,this.myRunnerPic, this.x,this.y, this.ang);
	}
	
	this.drawBoxes = function(){
		
		for (i=0;i<this.quests.length;i++){ // draw boxes
			var xy = rowColtoXY(this.quests[i][1][0],this.quests[i][1][1])
			canvasContext.drawImage(this.box[this.quests[i][2]], xy[0]-12,xy[1]-8)
			}
		}
}

// draw direction arrows
function drawArrows(useBitmap){
	if (useBitmap == girlPic){
			canvasContext.drawImage(redarrow, useBitmap.width/2 + 5, -redarrow.height/2)
			}else if (useBitmap == guyPic){
			canvasContext.drawImage(bluearrow, useBitmap.width/2 + 5, -bluearrow.height/2)
				}
	}