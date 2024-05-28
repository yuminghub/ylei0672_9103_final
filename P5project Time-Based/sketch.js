let img;
let numSegments = 40; // Number of segments in each direction
let segments = [];
let drawSegments = true;
let imgDrwPrps = { aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0 };
let canvasAspectRatio = 0;
let timer = 0;// Introduces a timer
let rowsGenerated = 0; //Introduces a row generated

// Load the image and create segments
function preload() {
  img = loadImage('../P5project Time-Based/asset/final1.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  calculateImageDrawProps();
}
//remove segments are generated all at once.

// Draw the segments or the image
function draw() {
  background(50);

  if (rowsGenerated < numSegments) {
    if (millis() - timer > 1000) {
      generateRow(rowsGenerated);
      rowsGenerated++;
      timer = millis();
    }
  } 

  if (drawSegments) {
    segments.forEach(segment => {
      segment.draw();
    });
  } else {
    image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  }
}

// Generate a row of segments
function generateRow(y) {
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;
  for (let x = 0; x < numSegments; x++) {
    let segXPos = x * segmentWidth;
    let segYPos = y * segmentHeight;
    let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
    let segment = new ImageSegment(x, y, segmentColour);
    segment.calculateSegDrawProps();
    segments.push(segment);
  }// Introduces generateRow function to create segments row by row 
}

// Reset the canvas after all rows are painted
function resetCanvas() {
  segments = [];
  rowsGenerated = 0;
  timer = millis();
}

// Toggle the drawing of the segments
function keyPressed() {
  if (key === " ") {
    drawSegments = !drawSegments;
  } else if (key === "C" || key === "c") {
    resetCanvas();
  }
}

// Resize the canvas and recalculate the drawing properties of the image
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageDrawProps();
  segments.forEach(segment => segment.calculateSegDrawProps());
}

// Calculate the drawing properties of the image
function calculateImageDrawProps() {
  canvasAspectRatio = width / height;
  if (imgDrwPrps.aspect > canvasAspectRatio) {
    imgDrwPrps.width = width;
    imgDrwPrps.height = width / imgDrwPrps.aspect;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height) / 2;
    imgDrwPrps.xOffset = 0;
  } else if (imgDrwPrps.aspect < canvasAspectRatio) {
    imgDrwPrps.height = height;
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) / 2;
    imgDrwPrps.yOffset = 0;
  } else {
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}

class ImageSegment {
  // Initialize the segment with its position and average colour
  constructor(columnPosition, rowPosition, srcImgSegColour) {
    this.columnPosition = columnPosition;
    this.rowPosition = rowPosition;
    this.srcImgSegColour = srcImgSegColour;
  }

  // Calculate the drawing properties of the segment
  calculateSegDrawProps() {
    this.drawWidth = imgDrwPrps.width / numSegments;
    this.drawHeight = imgDrwPrps.height / numSegments;
    this.drawXPos = this.columnPosition * this.drawWidth + imgDrwPrps.xOffset;
    this.drawYPos = this.rowPosition * this.drawHeight + imgDrwPrps.yOffset;
  }

  // Draw the segment as a rectangle with the average colour of the segment
  draw() {
    noStroke();
    fill(this.srcImgSegColour);
    rect(this.drawXPos, this.drawYPos, this.drawWidth - 7, this.drawHeight - 7);
  }
}
