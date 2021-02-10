let WIDTH = 900;
let HEIGHT = 600;
let FONT_SIZE = 14;

var parser;

// GUI
var inputField;
var inputButton;
var xSizeSlider;
var ySizeSlider;
var xRangeSlider;
var yRangeSlider;

// mouse control
var screenX = 0;
var screenY = 0;
var dragging = false;
var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensativity = 0.005;

// graph sizing
var xMargin = 0;
var yMargin = 200;
var xSize = 40;
var ySize = 25;
var xRange = 50;
var yRange = 50;

function setup() {
    
    createCanvas(WIDTH, HEIGHT, WEBGL);
    
    MATHSFONT_REGULAR = loadFont("font/Montserrat-Regular.otf");
    MATHSFONT_LIGHT = loadFont("font/Montserrat-Light.otf");
    MATHSFONT_BOLD = loadFont("font/Montserrat-Bold.otf");
    
    textSize(FONT_SIZE);
    textFont(MATHSFONT_REGULAR);
    
    parser = new Parser();
    
    inputField = createInput();
    inputField.position(10, 10);
    
    inputButton = createButton('Plot');
    inputButton.position(inputField.width + 10, 10);
    inputButton.mousePressed(plot);
    
    xRangeSlider = createSlider(2, 200, xRange, 2);
    xRangeSlider.position(10, HEIGHT + 20);
    xRangeP = createP('x-range');
    xRangeP.position(xRangeSlider.x * 2 + xRangeSlider.width, xRangeSlider.y - 15);
    
    yRangeSlider = createSlider(2, 200, yRange, 2);
    yRangeSlider.position(10, HEIGHT + 40);
    yRangeP = createP('y-range');
    yRangeP.position(yRangeSlider.x * 2 + yRangeSlider.width, yRangeSlider.y - 15);
    
    xSizeSlider = createSlider(0, 200, xSize);
    xSizeSlider.position(xRangeSlider.width + 100, HEIGHT + 20);
    xSizeP = createP('x-size');
    xSizeP.position(xSizeSlider.x + xSizeSlider.width + 10, xSizeSlider.y - 15);
    
    ySizeSlider = createSlider(0, 200, ySize);
    ySizeSlider.position(xRangeSlider.width + 100, HEIGHT + 40);
    ySizeP = createP('y-size');
    ySizeP.position(ySizeSlider.x + ySizeSlider.width + 10, ySizeSlider.y - 15);
    
    lastDragX = 0;
    lastDragY = 0;
    
}

function plot() {
    
    
    
}

function f(x) {
//    return Math.pow(x, 2); // parabola
    return Math.sin(x);
}

function mouseDragged() {
    
    if (mouseX > WIDTH || mouseY > HEIGHT) return;
    
    if (!dragging) {
        lastDragX = mouseX;
        lastDragY = mouseY;
    }
    
    dragging = true;
    
    var xDiff = mouseX - lastDragX;
    var yDiff = mouseY - lastDragY;
    
    screenX += xDiff;
    screenY += yDiff;
    
    lastDragX = mouseX;
    lastDragY = mouseY;
    
}

function mouseReleased() {
    dragging = false;
}

function mouseWheel(event) {
    zoom -= sensativity * event.delta;
    zoom = constrain(zoom, zMin, zMax);
    return false;
}

function draw() {
    
    background(17);
    
    stroke(255);
    strokeWeight(2);
    fill(255);
    
    xRange = xRangeSlider.value();
    yRange = yRangeSlider.value();
    xSize = xSizeSlider.value();
    ySize = ySizeSlider.value();
    
    scale(zoom);
    
    translate(screenX, screenY);
    
    drawAxes(xMargin, yMargin, xRange, yRange, xSize, ySize);
    
    // draw function
    var step = 0.1;
    stroke(255, 0, 0);
    for (var x = -xRange / 2; x <= xRange / 2 - 1; x += step) {
        
        var y = f(x);
        var yNext = f(x + step);
        
        if (y >= yRange / 2) continue;
        if (yNext >= yRange / 2) continue;
        
        var xOff = (x * xSize);
        var yOff = -y * ySize;
        
        var nextXOff = (x + step) * xSize;
        var nextYOff = -yNext * ySize;
        
        line(xMargin + xOff, yMargin + yOff, xMargin + nextXOff, yMargin + nextYOff);
        
    }
    
}

function drawAxes(xMargin, yMargin, xRange, yRange, xSize, ySize) {
    
    var lowX = -(xRange / 2);
    var lowY = -(yRange / 2);
    var highX = xRange / 2;
    var highY = yRange / 2;
    
    // draw x-axis line
    line(xMargin - ((xRange / 2) * xSize), yMargin, xMargin + ((xRange / 2) * xSize), yMargin)
    
    // draw x-axis number markings
    for (var x = lowX; x <= highX; x++) {
        
        //if (x % 2 != 0) continue;
        if (x == 0) continue;
        
        var xPos = xMargin + (x * xSize);
        line(xPos, yMargin - 5, xPos, yMargin + 5);
        
        s = str(x);
        sWidth = textWidth(s);
        text(s, xPos - (sWidth / 2), yMargin + 25);
        
    }
    
    // draw y-axis
    line(xMargin, yMargin - ((yRange / 2) * ySize), xMargin, yMargin + ((yRange / 2) * ySize))
    
    // draw y-axis number markings
    for (var y = lowY; y <= highY; y++) {
        
        //if (y % 2 != 0) continue;
        if (y == 0) continue;

        var yPos = yMargin + (y * ySize);
        line(xMargin - 5, yPos, xMargin + 5, yPos);
        
        s = str(y);
        sWidth = textWidth(s);
        text(s, xMargin + 15, yPos - (sWidth / 2));

    }
    
}
















