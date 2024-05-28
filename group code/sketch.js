let img;
let numSegments = 40; // Number of segments in each direction
let segments = [];
let drawSegments = true;
let imgDrwPrps = {aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0};
let canvasAspectRatio = 0;

// Load the image and create segments
function preload() {
  img = loadImage('../asset/final1.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  calculateImageDrawProps();

  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  // Create segments
  for (let y = 0; y < numSegments; y++) {
    for (let x = 0; x < numSegments; x++) {
      let segXPos = x * segmentWidth;
      let segYPos = y * segmentHeight;
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(x, y, segmentColour);
      segments.push(segment);
    }
  }
  segments.forEach(segment => segment.calculateSegDrawProps());
}

// Draw the segments or the image
function draw() {
  background(50);
  if (drawSegments) {
    segments.forEach(segment => {
      segment.draw();
    });
  } else {
    image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  }
}

// Toggle the drawing of the segments
function keyPressed() {
  if (key === " ") {
    drawSegments = !drawSegments;
  }
}

// Resize the canvas and recalculate the drawing properties of the image
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageDrawProps();
  segments.forEach(function(segment) {
    segment.calculateSegDrawProps();
  });
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
    this.drawYos = this.rowPosition * this.drawHeight + imgDrwPrps.yOffset;
  }

  // Draw the segment as a circle with the average colour of the segment
  draw() {
    noStroke();
    fill(this.srcImgSegColour);
    // circle(this.drawXPos + this.drawWidth / 2, this.drawYos + this.drawHeight / 2, this.drawWidth);
    rect(this.drawXPos, this.drawYos, this.drawWidth - 7, this.drawHeight - 7);
  }
}
