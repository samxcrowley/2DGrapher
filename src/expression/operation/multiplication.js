class MultiplicationOperation extends Operation {
    
    constructor(valueOne, valueTwo) {
        
        // swap values if constant and variable are in wrong order
        if (valueTwo instanceof ConstantTerm && valueOne instanceof VariableTerm) {
            var temp = valueOne;
            valueOne = valueTwo;
            valueTwo = temp;
        }
        
        // swap values if constant and operation are in wrong order
        if (valueTwo instanceof ConstantTerm && valueOne instanceof Operation) {
            var temp = valueOne;
            valueOne = valueTwo;
            valueTwo = temp;
        }
        
        super(valueOne, valueTwo, "*", true, 5);
        
    }
    
}















