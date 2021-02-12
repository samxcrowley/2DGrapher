/*

Terms have only one value, and may perform an operation on it as well, but not
always. A term could simply be a constant term, such as simply storing the number
22, or could be a square root term representing sqrt(144).

*/

class Term extends Expression {
    
    constructor(value) {
        
        super();
        
        this.value = value;
        
    }
    
}