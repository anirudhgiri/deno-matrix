export class Matrix{
    rows: number;
    cols: number;
    matrix : number[][];
    constructor(rows: number, cols: number){
        this.rows = rows;
        this.cols = cols;
        this.matrix = Array(this.rows).fill(null).map(()=>Array(this.cols).fill(0));
    }

    /**
     * Executes a function on every element of the matrix
     * @param func The function every value in the matrix should be applied to
     */
    funcMap(func: Function){
        for(let i = 0; i < this.rows; i++)
            for(let j = 0; j < this.cols; j++)
                this.matrix[i][j] = func(i,j,this.matrix[i][j]);
    }

    /**
     * Fills all elements of the matrix with a random number between the lower and upper bounds (0 and 1 by default)
     * @param lower lower bound(inclusive)
     * @param upper upper bound(exlusive)
     */
    randomize(lower: number = 0, upper: number = 1){
        for(let i = 0; i < this.rows; i++)
            for(let j = 0; j < this.cols; j++)
                this.matrix[i][j] = lower + (upper-lower) * Math.random();
    }

    /**
     * Prints the matrix to the console
     */
    print(){
       console.table(this.matrix);
    }

    /**
     * Rounds all elements of the matrix to the nearest integer
     */
    round(){
        this.funcMap(Math.round)
    }

    /**
     * Converts the current matrix into a zero matrix
     */
    toZeroMatrix(){
        this.funcMap(() => 0);
    }

    /**
     * Converts the current matrix into an identity matrix
     */
    toIdentityMatrix(){
        this.funcMap((i,j) => i == j ? 1 : 0);
    }

    /**
     * Adds the matrix with a number/another matrix
     * @param addend The addend number/matrix
     */
    add(addend: number | Matrix){
        if(addend instanceof Matrix)
            this.funcMap((i,j,val) => val + addend.matrix[i][j])
        else
            this.funcMap((i,j,val) => val + addend);        
    }

    /**
     * Subtracts the matrix with a number/another matrix
     * @param subtrahend The subtrahend matrix 
     */
    subtract(subtrahend: number | Matrix){
        if(subtrahend instanceof Matrix)
            this.funcMap((i,j,val) => val - subtrahend.matrix[i][j]);
        else
            this.funcMap((i,j,val) => val - subtrahend);
    }

    /**
     * Performs Hadamard multiplication
     * @param multiplicand The multiplicand matrix
     */
    hadamard(multiplicand: Matrix){
        this.funcMap((i,j,val) => val * multiplicand[i][j]);
    }

    /**
     * Returns the dot product of the given matrices (performs Matrix Multiplication)
     * @param multiplicand The multiplicand matrix
     * @param multiplier The multiplier matrix
     */
    static multiply(multiplicand: Matrix, multiplier : Matrix){
        return new Matrix(multiplicand.rows, multiplier.cols).funcMap((i,j,val) => {
            let sum = 0;
            for(let k = 0; k < multiplicand.cols; k++)
                sum += multiplicand.matrix[i][k] * multiplier.matrix[k][j];
            return sum;
        })
    }

    /**
     * Multiplies all elements of the matrix with the given number. If the argument is a matrix, Hadamard multiplication is performed instead.
     * @param multiplier The multiplier number/matrix
     */
    multiply(multiplier: number | Matrix){
        if(multiplier instanceof Matrix)
            this.hadamard(multiplier);
        else
            this.funcMap((i,j,val) => val * multiplier);
    }

    /**
     * Transposes the matrix
     */
    transpose(){
        let transposed = new Matrix(this.cols,this.rows);
        for(let i = 0; i < this.rows; i++)
            for(let j = 0; j<this.cols; j++){
                transposed.matrix[j][i] = this.matrix[i][j];
            }
        this.rows = transposed.rows;
        this.cols = transposed.cols;
        this.matrix = transposed.matrix;
        return this;
    }

    /**
     * Transposes the matrix
     * @param input The matrix to be transposed
     */
    static transpose(input: Matrix){
        return input.transpose();
    }
}