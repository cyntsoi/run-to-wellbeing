const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const SHIFT = 16;
const SPACE = 32;

// used for debugging
var waiting = false

function setupInput() {

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	girl.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
	guy.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
} 


function keySet(keyEvent, whichRunner, setTo) {
	
	// press space to start game
	if(start && keyEvent.keyCode == SPACE && !setTo){
		start = false;
		buttonAudio.play();
		backgroundAudio.play();
		girl.freeze=false;
		guy.freeze=false;
		}
	
	
	if(showFinalQuest && !waiting ){
		// chooses to keep trophy 
		if(keyEvent.keyCode == SHIFT){
			buttonAudio.play();
			if(setTo){
				// shows colored trophy when key down
				finalQuest.src = "images/" + finalSet[0]
				}else{
					// shows win screen when key up
					showFinalQuest= false
					showWinScreen = true
					}
			
			} else if (keyEvent.keyCode == SPACE){ // chooses to give trophy to friend
			buttonAudio.play();
			if(setTo){
				// shows colored hearts when key down
				finalQuest.src = "images/" + finalSet[1]
				}else{
					// shows win screen when key up
					if (winner==player1){
						winner = player2
						} else{winner = player1}
						waiting=true
					setTimeout(function(){showFinalQuest= false; showWinScreen = true;waiting=false},50)
					}	
				
				}
		
		return;}
	// reset game after win screen is shown
	if(showWinScreen&&  keyEvent.keyCode == SPACE && !setTo){
		buttonAudio.play();
		backgroundAudio.currentTime =0
		winMusicAudio.currentTime =0
		backgroundAudio.play();
		winMusicAudio.pause();
		showWinScreen=false
		loadArena();
		time=0;
		return;}
	
	// set runner movements
	if(keyEvent.keyCode == whichRunner.controlKeyLeft) {
		whichRunner.keyHeld_TurnLeft = setTo;
	}
	if(keyEvent.keyCode == whichRunner.controlKeyRight) {
		whichRunner.keyHeld_TurnRight = setTo;
	}
	if(keyEvent.keyCode == whichRunner.controlKeyUp) {
		whichRunner.keyHeld_moveForward = setTo;
	}
	if(keyEvent.keyCode == whichRunner.controlKeyDown) {
		whichRunner.keyHeld_moveBackward = setTo;

		// each players's down key is used as 'enter' during quests 
		if (!setTo && whichRunner.player.questON && whichRunner.player.questionState>0){
		whichRunner.player.keydown = true
		}
		;
	}
}

function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, girl, true);
	keySet(evt, guy, true);


}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, girl, false);
	keySet(evt, guy, false);
}