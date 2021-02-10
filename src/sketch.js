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
    inputField.position(20, HEIGHT + 10);
    
    inputButton = createButton('Plot');
    inputButton.position(inputField.x + inputField.width + 20, HEIGHT + 10);
    inputButton.mousePressed(plot);
    
    xRangeSlider = createSlider(0, 50, xRange, 2);
    xRangeSlider.position(WIDTH - 100, HEIGHT + 10);
    
    yRangeSlider = createSlider(0, 50, yRange, 2);
    yRangeSlider.position(WIDTH - 100, HEIGHT + 30);
    
    xSizeSlider = createSlider(0, 50, xSize);
    xSizeSlider.position(WIDTH - 100, HEIGHT + 50);
    
    ySizeSlider = createSlider(0, 50, ySize);
    ySizeSlider.position(WIDTH - 100, HEIGHT + 70);
    
    lastDragX = 0;
    lastDragY = 0;
    
}

function plot() {
    
    
    
}

function f(x) {
    return Math.pow(x, 2);
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
    
    scale(zoom);
    translate(screenX, screenY);
    
    xRange = xRangeSlider.value();
    yRange = yRangeSlider.value();
    xSize = xSizeSlider.value();
    ySize = ySizeSlider.value();
    
    drawAxes(xMargin, yMargin, xRange, yRange, xSize, ySize);
    
    // draw function
    stroke(255, 0, 0);
    for (var x = -5; x < 5; x++) {
        
        var y = f(x);
        var yNext = f(x + 1);
        
        var xOff = (x * xSize);
        var yOff = -y * ySize;
        
        var nextXOff = (x + 1) * xSize;
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
















