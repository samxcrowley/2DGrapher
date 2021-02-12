class SubtractionOperation extends AdditionOperation {
    
    constructor(valueOne, valueTwo) {
        super(valueOne, valueTwo, "-", false, 0);
        this.symbol = "-";
    }
    
}