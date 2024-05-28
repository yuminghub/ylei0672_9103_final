# ylei0672_9103_final

## Interaction of Coding
By simply opening the webpage, you can see the matrix appearing row by row. A row of rectangles will be generated every second, and after 40 seconds the complete artwork will appear as a matrix rectangle, and then the artboard will be reset to enter the loop.

## Details of the approach to animating 
This code, based on the group's work, use Time-Based to approach to animating. Introduces a timer to create a dynamic and progressive visual representation using small rectangular segments. 
In contrast to the group's artwork, which generates and displays all segments at once, this introduces a row-by-row generation mechanism where each row of segments is created and displayed with a delay, creating a progressive display effect. This approach enhances the visual experience by building anticipation as the image gradually appears.

## Inspiration
I was inspired by Tetris, our group's artwork was pixelated pictures, and I tried to make a rectangular array that stacked over time. I thought of the automatically changing events mentioned in the fifth week's tutorial. Based on the events, it can generate animations according to functions.

![Tetris game](/picture/Tetris.png)

## Code analysis
This code is modified based on the group's code, retaining the visual effects of the group's code. Millis() was introduced to create a time-based dynamic and progressive visual representation of an image using small rectangular segments.
millis() from [p5.js Reference](https://p5js.org/reference/#/p5/millis)

```
let timer = 0;// Introduces a timer
let rowsGenerated = 0; //Introduces a row generated
```
Set rowsGenerated and timer. Modifying rowsGenerated can change the place where rows start to be generated.

```
function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  calculateImageDrawProps();
}
//remove segments are generated all at once.
```
The above is the modified team code. The original code will generate all segments at once. By removing the code, the animation will be implemented in the draw function below.


```
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
```
Uses the millis() function to measure time elapsed and control the timing of row generation. logic to generate rows over time, checking if rowsGenerated is less than numSegments and if more than 1000 milliseconds have passed since the last row was generated. This involves updating rowsGenerated and timer.

```
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
```
Row Generation Function:
generateRow(y) creates segments for the specified row index y. For each column in the row, it calculates the position and average color of the segment, creates an ImageSegment object, calculates its drawing properties, and adds it to the segments array.


```
function resetCanvas() {
  segments = [];
  rowsGenerated = 0;
  timer = millis();
}
```

```
// Toggle the drawing of the segments
function keyPressed() {
  if (key === " ") {
    drawSegments = !drawSegments;
  } else if (key === "C" || key === "c") {
    resetCanvas();
  }
}
```