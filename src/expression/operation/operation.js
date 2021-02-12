/*

Operations have two values as parameters, and each type of operation performs
a certain mathematical operation between the two terms. For example, the
Addition Operation could take in the number 5 as its first value and the
variable x as its second. The operation would then represent the expression
'5 + x'.

*/

class Operation extends Expression {
    
    /*
        symbol: '+', '-', '*', etc.
        leftAssociative: true if operation is left associative
        precedence: int describing operation's level of precedence over other operations
    */
    constructor(valueOne, valueTwo, symbol, leftAssociative, precedence) {
        
        super();
        
        this.valueOne = valueOne;
        this.valueTwo = valueTwo;
        
        this.symbol = symbol;
        this.leftAssociative = leftAssociative;
        this.precedence = precedence;
        
    }
    
    comparePrecedence(operation) {
        return this.precedence - operation.precedence;
    }
    
}
















