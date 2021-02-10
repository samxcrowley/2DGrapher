/*

Infix notation e.g.: "A ^ 2 + 2 * A * B + B ^ 2" (operators in between operands)
RPN notation e.g.: "A 2 ^ 2 A * B * + B 2 ^ +" (operators after operands)

infixToRPN algorithm adapted from https://www.andreinc.net/2010/10/05/converting-infix-to-rpn-shunting-yard-algorithm
calculateRPN algorithm adapted from https://codereview.stackexchange.com/questions/120451/reverse-polish-notation-calculator-in-java

*/

class Parser {
    
    constructor() {
        this.operators = ['+', '-', '*', '/', '^'];
    }
    
    // converts a string in Infix notation to RPN notation
    infixToRPN(infixString) {
        
        var output = "";
        var stack = [];
        
        var tokens = this.tokenize(infixString);
        
        for (let i = 0; i < tokens.length; i++) {
            
            var token = tokens[i];
            
            if (this.operators.includes(token)) {
                
                while (stack.length != 0 && this.operators.includes(stack[0])) {
                    
                    var currOper = this.getOperationFromSymbol(token);
                    var lastOper = this.getOperationFromSymbol(stack[0]);
                    
                    if ((currOper.leftAssociative && currOper.comparePrecedence(lastOper) <= 0) ||
                       (!currOper.leftAssociative && currOper.comparePrecedence(lastOper) < 0)) {
                        
                        output = output + stack.shift() + " ";
                        continue;
                    }
                    
                    break;
                    
                }
                
                stack.unshift(token);
                
            } else if (token === "(") {
                
                stack.unshift(token);
                
            } else if (token === ")") {
                
                while (stack.length != 0 && stack[0] !== "(") {
                    output = output + stack.shift(token) + " ";
                }
                
                stack.shift();
                
            } else {
                output = output + token + " ";
            }
            
        }
        
        while (stack.length != 0) {
            output = output + stack.shift() + " ";
        }
        
        output = output.substr(0, output.length - 1);
        
        return output;
        
    }
    
    // returns the result after calculating an RPN string
    calculateRPN(rpnString) {
        
        var stack = [];
        
        var tokens = rpnString.split(" ");
        
        for (let i = 0; i < tokens.length; i++) {
            
            var token = tokens[i];
            
            if (this.operators.includes(token)) {
                
                var x = parseFloat(stack.shift());
                var y = parseFloat(stack.shift());
                
                var result = 0;
                
                switch (token) {
                    case '+':
                        result = x + y;
                        break;
                    case '-':
                        result = y - x;
                        break;
                    case '*':
                        result = x * y;
                        break;
                    case '/':
                        result = y / x;
                        break;
                    case '^':
                        result = Math.pow(y, x);
                        break;
                }
                
                stack.unshift(result);
                
            } else {
                stack.unshift(token);
            }
            
        }
        
        return stack.shift();
        
    }
    
    getOperationFromSymbol(symbol) {
        
        switch (symbol) {
            case '+':
                return new AdditionOperation('0', '0');
                break;
            case '-':
                return new SubtractionOperation('0', '0');
                break;
            case '*':
                return new MultiplicationOperation('0', '0');
                break;
            case '/':
                return new DivisionOperation('0', '0');
                break;
            case '^':
                return new IndexOperation('0', '0');
                break;
        }
        
    }
    
    // splits a string into separate tokens; digits, parentheses, letters, etc.
    tokenize(str) {
        return str.replace(/\s+/g, "").match(/(?:(?<!\d)-)?\d+(?:\.\d+)?|./g);
    }
    
}