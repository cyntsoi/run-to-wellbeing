// used to displayer contents on left and right panels

// answers to each quest question
var answers = [3,3,2,3,2,3,3,2,2,1,0,1]

// for debugging
var waitTime = 10

function playerClass(){
	this.cvs;
	this.ctx; // player panel canvas and context
	
	this.firstquest = true // if it is the first time the player enters a quests
	
	this.firstinwater = true // if it is the first time the runner gets into water
	this.displaywaterinstr = false // displays instruction in when runner is in water 
	
	this.controlinstr = true // if control key instructions is needed
	this.controlimg; 
	
	this.myPlayerPic; // larger character pic on panel
	this.myBgPic; // panel background
	
	this.unlocked = false; // if the goal is unlocked on the player's side
	
	// quest position
	this.questPosX; 
	this.questPosY;
	this.questWidth;
	this.questHeight;
	
	this.runner;
	this.questCount=0; // count number of quest completed 
	
	this.keydown;
	
	this.questON = false; // if any quest is activated
	this.questCompleted = [false,false,false,false]; // saves which quests are completed
	this.currentQuest; // current quest number
	this.questionNo; // current question number
	this.questionState; // whether the question is not answered yet, gotten right or gotten wrong
	this.showCorrectPage=false;
	this.showWrongPage=false;
	
	this.freezeFactor = waitTime
	this.freezeQuest = false
	
	this.reset = function(){ // reset player
	
	this.unlocked=false;
	
	this.questCount = 0 
	
	this.addScore=10000;
	this.score = 0 ;
	
	this.questON = false;
	this.questCompleted = [false,false,false,false];
	this.showCorrectPage=false;
	this.showWrongPage=false;
	
	this.freezeQuest = false
		}
	
	this.setupPlayer = function(canvas,context,runner,pic,bg,controlimg,qposX,qposY,qW,qH){
		this.cvs = canvas;
		this.ctx = context;
		this.runner = runner;
		this.myPlayerPic = pic;
		this.myBgPic = bg;
		this.questPosX = qposX;
		this.questPosY = qposY;
		this.questWidth = qW;
		this.questHeight =qH;
		this.controlimg= controlimg;
		}
	
	// initiating quest
	this.startQuest = function(){
		// chooses question randomly
		if (this.questionNo == undefined){
			this.questionNo = Math.floor(Math.random()*3)
			} else {
				this.questionNo ++;
				this.questionNo = this.questionNo%3}
			this.questionState=0;
			this.keydown = false
		}
	
	
	this.update = function(){
		//debugging
		if (this.freezeFactor>=waitTime){this.freezeQuest=false}else{this.freezeFactor++;return}
		
		// if quest is active and not completed
		if(this.questON && !this.questCompleted[this.currentQuest]){
			
			// when player just responeded to unanswered question
			if(this.questionState == 0 && this.runner.keyHeld_moveForward|| this.runner.keyHeld_moveBackward || this.runner.keyHeld_TurnLeft || this.runner.keyHeld_TurnRight && !this.keydown){
				
				this.firstquest=false;
				
				// convert key to answer
				
				var answer;
				
				if(this.runner.keyHeld_moveForward){
					answer = 0
					} else if(this.runner.keyHeld_moveBackward) {
						answer = 1
						} else if (this.runner.keyHeld_TurnLeft){
							answer = 2 
							} else {
								answer = 3
								}
				
				var answerIndex = this.currentQuest*3 + this.questionNo
				
				
				//check answer
				if (answers[answerIndex] == answer && !this.showWrongPage){		
					playAnswerAudio(true,this.questionState)
					this.questionState=1; // the question is answered correctly
					this.showCorrectPage=true
					} else if (answers[answerIndex] != answer && !this.showCorrectPage) {
					playAnswerAudio(false,this.questionState)
					this.questionState=2 // the answer is incorrect
					this.showWrongPage=true
					
						}
			}
			
			
				if (this.showCorrectPage && this.keydown){ 
				// resume race after user answers question correctly			
					playButtonAudio()
					var newQuestCompleted = this.questCompleted.slice()
					newQuestCompleted[this.currentQuest] = true
					
					this.questCompleted = newQuestCompleted
					
					this.score+=this.addScore
					this.addScore = 10000
					this.runner.freeze = false
					this.showCorrectPage = false
					this.questON = false
					this.questCount ++
					} else if (!this.freezeQuest && this.showWrongPage && this.keydown){
					// deduct score and ask another question if answer is incorrect;
					if(this.addScore>0){this.addScore-=1000}
					this.keydown =  false;
					this.showWrongPage = false;
					this.startQuest();
					}
				
			}
		};
	
	this.draw = function(){ // drawing player panel
		if(this.questON && !this.questCompleted[this.currentQuest]){ // draw quest question
			this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height)
			this.ctx.drawImage(questPics[this.currentQuest][this.questionNo][this.questionState],0,0)
			} else { 
			
				this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height)
				
				// draw panel background
				this.ctx.drawImage(this.myBgPic,0,0);
				
				// draw large character pic
				var source = this.runner.imgSet[this.runner.location][this.runner.walkState]
				this.myPlayerPic.src = "images/characters_L/" + source
				drawBitmapCenteredWithRotation(this.ctx,this.myPlayerPic, 80,75, 0)
				
				// draw text 
				this.ctx.fillStyle='white';
				this.ctx.font = '12px sans-serif'
				this.ctx.textAlign ='center';
				this.ctx.fillText(this.questCount.toString()+ " / 4",80,190)
				this.ctx.fillText(this.score.toString(),80,270)
				this.ctx.fillText(minutes + ":" + seconds,80,340)
				
				}	
		}
	
	this.drawInstr = function(){ // draw instructions
		if(this.controlinstr && !start){ // control key instruction
			drawBitmapCenteredWithRotation(canvasContext,this.controlimg, this.questPosX + this.questWidth/2,this.questPosY+this.questHeight-60,0)
			}
		if(this.questON){
			if(this.controlinstr){this.controlinstr=false} // hide control key instruction once the runner reaches first quest
			if(this.questionState==0 && this.firstquest){ // hint user to use the same keys to answer question
				drawBitmapCenteredWithRotation(canvasContext,questinstr, this.questPosX + this.questWidth/2,this.questPosY+this.questHeight-60,0)
				}
			}
			if(this.displaywaterinstr && !this.questON){ // hints user to hold control keys in water
			drawBitmapCenteredWithRotation(canvasContext,waterinstr, this.questPosX + this.questWidth/2,this.questPosY+this.questHeight-60,0)
			}
		
		}
	
	this.drawQuest = function(){
		
		if(this.questON){ // draws black background on main panel
			colorRect(this.questPosX, this.questPosY,this.questWidth ,this.questHeight,'rgba(0,0,0,0.5)')
			
			if(this.questionState==0){
				// draws paused page on main panel
				drawBitmapCenteredWithRotation(canvasContext,paused, this.questPosX+this.questWidth/2,this.questPosY+this.questHeight/2, 0)
				
				} else if (this.questionState == 1){
					//draws correct page on main panel
					drawBitmapCenteredWithRotation(canvasContext,correct, this.questPosX+this.questWidth/2,this.questPosY+this.questHeight/2, 0)
					} else {
						//draws wrong page on main panel
						drawBitmapCenteredWithRotation(canvasContext,wrong, this.questPosX+this.questWidth/2,this.questPosY+this.questHeight/2, 0)
					}
			}
			
			if(this.unlocked){
				// draws unlocked text if goal is unlocked
				drawBitmapCenteredWithRotation(canvasContext,unlocked, this.questPosX+this.questWidth/2,this.questPosY+this.questHeight/2, 0)
				}
		}	
	}
	
function setupPlayer(){
	player1.setupPlayer(p1canvas,p1ctx,girl,player1Pic,bg1,p1control,40,40,320,480);
	player2.setupPlayer(p2canvas,p2ctx,guy,player2Pic,bg2,p2control,400,40,360,480);
	}
