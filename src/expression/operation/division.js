class DivisionOperation extends Operation {
    
    // valueOne is numerator
    // valueTwo is denominator
    constructor(valueOne, valueTwo) {
        
        super(valueOne, valueTwo, "/", true, 5);
        
        this.lineOff = 10;
        
    }
    
}