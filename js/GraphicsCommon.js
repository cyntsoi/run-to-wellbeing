function drawBitmapCenteredWithRotation(ctx,useBitmap, atX,atY, withAng) {
	ctx.save();
	ctx.translate(atX, atY);
	ctx.rotate(withAng);
	
	// draws small direction arrow for each runner
	drawArrows(useBitmap);
	
	ctx.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	ctx.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}