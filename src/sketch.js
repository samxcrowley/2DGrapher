let WIDTH = 1280;
let HEIGHT = 720;
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
var lastDragX = 0;
var lastDragY = 0;
var dragging = false;

// zoom control
var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensativity = 0.001;

// graph sizing
var xMargin = 0;
var yMargin = 200;
var xSize = 40;
var ySize = 25;
var xRange = 50;
var yRange = 50;

// function stuff
var xValues = [];
var yValues = [];
var step = 0.1;

function setup() {
    
    createCanvas(WIDTH, HEIGHT, WEBGL);
    frameRate(24);
    
    MATHSFONT_REGULAR = loadFont("font/Montserrat-Regular.otf");
    MATHSFONT_LIGHT = loadFont("font/Montserrat-Light.otf");
    MATHSFONT_BOLD = loadFont("font/Montserrat-Bold.otf");
    
    textSize(FONT_SIZE);
    textFont(MATHSFONT_REGULAR);
    
    parser = new Parser();
    
    createGUI();
    
}

function plot() {
    
    // convert user input to RPN notation
    var rawInput = inputField.value();
    var rpnString = parser.infixToRPN(rawInput);
    
    // clear x and y values arrays
    xValues = [];
    yValues = [];
    
    // loop through all values of x and calculate corresponding y value
    for (var x = -xRange / 2; x <= xRange / 2; x += step) {
        
        xValues.push(x);
        
        // replace 'x' in RPN string with number value
        var replacedRPNString = rpnString.replace(/x/g, str(x));
        console.log(replacedRPNString);
        
        var y = parser.calculateRPN(replacedRPNString);
        yValues.push(y);
        
    }
    
}

function draw() {
    
    background(17);
    
    xRange = xRangeSlider.value();
    yRange = yRangeSlider.value();
    xSize = xSizeSlider.value();
    ySize = ySizeSlider.value();
    
    translate(screenX, screenY);
    scale(zoom);
    
    stroke(255);
    strokeWeight(2);
    fill(255);
    
    drawAxes();
    drawFunction();
    
}

function drawFunction() {
    
    stroke(255, 0, 0);
    
    for (var i = 0; i <= xValues.length; i++) {
        
        var x = xValues[i];
        var xNext = xValues[i + 1];
        var y = yValues[i];
        var yNext = yValues[i + 1];
        
        if (y >= yRange / 2) continue;
        if (yNext >= yRange / 2) continue;
        
        var xOff = x * xSize;
        var yOff = -y * ySize;
        
        var nextXOff = (x + step) * xSize;
        var nextYOff = -yNext * ySize;
        
        line(xMargin + xOff, yMargin + yOff, xMargin + nextXOff, yMargin + nextYOff);
        
    }
    
}

function drawAxes() {
    
    // make range a positive even number for nice rendering
    var intXRange = Math.floor(xRange);
    if (intXRange % 2 != 0) intXRange--;
    var intYRange = Math.floor(yRange);
    if (intYRange % 2 != 0) intYRange--;
    
    var lowX = -(intXRange / 2);
    var lowY = -(intYRange / 2);
    var highX = intXRange / 2;
    var highY = intYRange / 2;
    
    // draw x-axis line
    line(xMargin - ((xRange / 2) * xSize), yMargin, xMargin + ((xRange / 2) * xSize), yMargin)
    
    // draw x-axis number markings
    for (var x = lowX; x <= highX; x++) {
        
        if (x == 0) continue;
        if (x % 1 != 0) continue;
        
        var xPos = xMargin + (x * xSize);
        line(xPos, yMargin - 5, xPos, yMargin + 5);
        
        s = str(x);
        sWidth = textWidth(s);
        text(s, xPos - (sWidth / 2), yMargin + 25);
        
    }
    
    // draw y-axis line
    line(xMargin, yMargin - ((yRange / 2) * ySize), xMargin, yMargin + ((yRange / 2) * ySize))
    
    // draw y-axis number markings
    for (var y = lowY; y <= highY; y++) {
        
        if (y == 0) continue;
        if (y % 1 != 0) continue;

        var yPos = yMargin + (y * ySize);
        line(xMargin - 5, yPos, xMargin + 5, yPos);
        
        s = str(-y);
        sWidth = textWidth(s);
        text(s, xMargin + 15, yPos - (sWidth / 2));

    }
    
}

// create HTML elements such as input textbox and button, and sliders
function createGUI() {
    
    inputField = createInput();
    inputField.position(WIDTH - 400, HEIGHT + 20);
    
    inputButton = createButton('Plot');
    inputButton.position(WIDTH - 400 + inputField.width + 10, HEIGHT + 20);
    inputButton.mousePressed(plot);
    
    xRangeSlider = createSlider(2, 200, xRange, 0.1);
    xRangeSlider.position(10, HEIGHT + 20);
    xRangeP = createP('x-range');
    xRangeP.position(xRangeSlider.x * 2 + xRangeSlider.width, xRangeSlider.y - 15);
    
    yRangeSlider = createSlider(2, 200, yRange, 0.1);
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
    
    xRangeSlider.input(plot);
    yRangeSlider.input(plot);
    xSizeSlider.input(plot);
    ySizeSlider.input(plot);
    
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












