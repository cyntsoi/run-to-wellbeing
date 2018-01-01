var startPage = document.createElement("img");

var guyPic = document.createElement("img");
var girlPic = document.createElement("img");
var redbox1 = document.createElement("img");
var redbox2 = document.createElement("img");
var redbox3 = document.createElement("img");
var bluebox1 = document.createElement("img");
var bluebox2 = document.createElement("img");
var bluebox3 = document.createElement("img"); 
var correct = document.createElement("img");  
var wrong = document.createElement("img"); 
var paused =document.createElement("img"); 
var unlocked=document.createElement("img"); 
var questinstr = document.createElement("img");
var waterinstr = document.createElement("img");

var mtoiletPic = document.createElement("img");
var ftoiletPic = document.createElement("img");
var arrowleftPic = document.createElement("img");
var arrowrightPic = document.createElement("img");
var swimmingpoolPic = document.createElement("img");
var swimmingpoolshadePic = document.createElement("img");
var trackPics = [];

var player1Pic = document.createElement("img");
var player2Pic = document.createElement("img");
var bg1 = document.createElement("img");
var bg2 = document.createElement("img");

var p1control = document.createElement("img");
var p2control = document.createElement("img");

var redarrow = document.createElement("img");
var bluearrow = document.createElement("img");

var girlUp = ['girl1a.png','girl1b.png','girl1c.png']
var girlDown = ['girl2a.png','girl2b.png','girl2c.png']

var guyUp = ['guy1a.png','guy1b.png','guy1c.png']
var guyDown = ['guy2a.png','guy2b.png','guy2c.png']

var finalQuest = document.createElement("img");
var winScreen = document.createElement("img");

var finalSet = ['p5_shift.png','p5_space.png'];

var winSet=['win1.png','win2.png']

var questPics = [[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
//	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImageForQuest(principle, question, part, fileName) {
	questPics[principle-1][question-1][part-1] = document.createElement("img");
	beginLoadingImage(questPics[principle-1][question-1][part-1], fileName);
	console.log(questPics)
}

function loadImages() {
	
	var imageList = [
		{varName: guyPic, theFile: "characters/guy1a.png"},
		{varName: girlPic, theFile: "characters/girl1a.png"},
		{varName: mtoiletPic, theFile: "mtoilet.png"},
		{varName: ftoiletPic, theFile: "ftoilet.png"},
		{varName: arrowleftPic, theFile: "arrow_left.png"},
		{varName: arrowrightPic, theFile: "arrow_right.png"},
		{varName: redbox1, theFile: "redbox1.png"},
		{varName: redbox2, theFile: "redbox2.png"},
		{varName: redbox3, theFile: "redbox3.png"},
		{varName: bluebox1, theFile: "bluebox1.png"},
		{varName: bluebox2, theFile: "bluebox2.png"},
		{varName: bluebox3, theFile: "bluebox3.png"},
		{varName: paused, theFile: "quest/paused.png"},
		{varName: correct, theFile: "quest/correct.png"},
		{varName: wrong, theFile: "quest/wrong.png"},
		{varName: unlocked, theFile: "quest/unlocked.png"},
		{varName: player1Pic, theFile:"characters_L/girl1a.png"},
		{varName: player2Pic,theFile:"characters_L/guy1a.png"},
		{varName: bg1, theFile: "bg1.png"},
		{varName: bg2, theFile: "bg2.png"},
		{varName: finalQuest, theFile: "p5.png"},
		{varName: winScreen, theFile: "win1.png"},
		{varName: redarrow, theFile: "redarrow.png"},
		{varName: bluearrow, theFile: "bluearrow.png"},
		{varName: p1control, theFile: "p1control.png"},
		{varName: p2control, theFile: "p2control.png"},
		{varName: startPage, theFile: "start.png"},
		{varName: questinstr, theFile: "questinstr.png"},
		{varName: waterinstr, theFile: "waterinstr.png"},
		
		{trackType: TRACK_ROAD, theFile: "track_road.png"},
		{trackType: TRACK_WALL, theFile: "track_wall.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal.png"},
		{trackType: TRACK_SHELF, theFile: "track_shelf.png"},
		{trackType: TRACK_FLAG, theFile: "track_flag.png"},
		{trackType: TRACK_BLACK, theFile: "track_black.png"},
		{trackType: TRACK_RUNMACHINE, theFile: "track_runmachine.png"},
		{trackType: TRACK_WATER, theFile: "track_water.png"},
		{trackType: TRACK_ROLLLEFT, theFile: "track_road.png"},
		{trackType: TRACK_ROLLRIGHT, theFile: "track_road.png"},
		
		{Principle: 1, Question: 1, Part: 1, theFile: "quest/p1q1a.png"},
		{Principle: 1, Question: 1, Part: 2, theFile: "quest/p1q1b.png"},
		{Principle: 1, Question: 1, Part: 3, theFile: "quest/p1q1c.png"},
		{Principle: 1, Question: 2, Part: 1, theFile: "quest/p1q2a.png"},
		{Principle: 1, Question: 2, Part: 2, theFile: "quest/p1q2b.png"},
		{Principle: 1, Question: 2, Part: 3, theFile: "quest/p1q2c.png"},
		{Principle: 1, Question: 3, Part: 1, theFile: "quest/p1q3a.png"},
		{Principle: 1, Question: 3, Part: 2, theFile: "quest/p1q3b.png"},
		{Principle: 1, Question: 3, Part: 3, theFile: "quest/p1q3c.png"},
		{Principle: 2, Question: 1, Part: 1, theFile: "quest/p2q1a.png"},
		{Principle: 2, Question: 1, Part: 2, theFile: "quest/p2q1b.png"},
		{Principle: 2, Question: 1, Part: 3, theFile: "quest/p2q1c.png"},
		{Principle: 2, Question: 2, Part: 1, theFile: "quest/p2q2a.png"},
		{Principle: 2, Question: 2, Part: 2, theFile: "quest/p2q2b.png"},
		{Principle: 2, Question: 2, Part: 3, theFile: "quest/p2q2c.png"},
		{Principle: 2, Question: 3, Part: 1, theFile: "quest/p2q3a.png"},
		{Principle: 2, Question: 3, Part: 2, theFile: "quest/p2q3b.png"},
		{Principle: 2, Question: 3, Part: 3, theFile: "quest/p2q3c.png"},
		{Principle: 3, Question: 1, Part: 1, theFile: "quest/p3q1a.png"},
		{Principle: 3, Question: 1, Part: 2, theFile: "quest/p3q1b.png"},
		{Principle: 3, Question: 1, Part: 3, theFile: "quest/p3q1c.png"},
		{Principle: 3, Question: 2, Part: 1, theFile: "quest/p3q2a.png"},
		{Principle: 3, Question: 2, Part: 2, theFile: "quest/p3q2b.png"},
		{Principle: 3, Question: 2, Part: 3, theFile: "quest/p3q2c.png"},
		{Principle: 3, Question: 3, Part: 1, theFile: "quest/p3q3a.png"},
		{Principle: 3, Question: 3, Part: 2, theFile: "quest/p3q3b.png"},
		{Principle: 3, Question: 3, Part: 3, theFile: "quest/p3q3c.png"},
		{Principle: 4, Question: 1, Part: 1, theFile: "quest/p4q1a.png"},
		{Principle: 4, Question: 1, Part: 2, theFile: "quest/p4q1b.png"},
		{Principle: 4, Question: 1, Part: 3, theFile: "quest/p4q1c.png"},
		{Principle: 4, Question: 2, Part: 1, theFile: "quest/p4q2a.png"},
		{Principle: 4, Question: 2, Part: 2, theFile: "quest/p4q2b.png"},
		{Principle: 4, Question: 2, Part: 3, theFile: "quest/p4q2c.png"},
		{Principle: 4, Question: 3, Part: 1, theFile: "quest/p4q3a.png"},
		{Principle: 4, Question: 3, Part: 2, theFile: "quest/p4q3b.png"},
		{Principle: 4, Question: 3, Part: 3, theFile: "quest/p4q3c.png"},
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else if (imageList[i].trackType != undefined){
			console.log(imageList[i])
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		} else {
			loadImageForQuest(imageList[i].Principle,imageList[i].Question,imageList[i].Part,imageList[i].theFile)
			}
	}
}