class IndexOperation extends Operation {
    
    // valueOne is base (any Expression)
    // valueTwo is index (Constant)
    constructor(valueOne, valueTwo) {
        
        super(valueOne, valueTwo, "^", false, 10);
        
        this.index_size = FONT_SIZE / 1.5;
        
    }
    
}