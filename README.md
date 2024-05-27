# ylei0672_9103_final

## Iinteraction of Coding
By simply opening the webpage, you can see the matrix appearing row by row. A row of rectangles will be generated every second, and after 40 seconds the complete artwork will appear as a matrix rectangle, and then the artboard will be reset to enter the loop.

## Details of the approach to animating 
This code, based on the group's work, use Time-Based to approach to animating. Introduces a timer to create a dynamic and progressive visual representation using small rectangular segments. 
In contrast to the group's artwork, which generates and displays all segments at once, this introduces a row-by-row generation mechanism where each row of segments is created and displayed with a delay, creating a progressive display effect. This approach enhances the visual experience by building anticipation as the image gradually appears.

millis() from p5.js[p5.js Reference](https://p5js.org/reference/#/p5/millis)