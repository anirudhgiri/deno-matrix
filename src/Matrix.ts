import {MatrixMismatchError} from './MatrixMismatchError.ts';

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
     * creates a copy of a Matrix
     * @param copyMatrix The matrix to be copied
     */
    static copy(copyMatrix:Matrix){
        let result = new Matrix(copyMatrix.rows, copyMatrix.cols);
        result.funcMap((i:number,j:number) => copyMatrix.matrix[i][j]);
        return result;
    }

    /**
     * Fills all elements of the matrix with a random number between the lower and upper bounds (0 and 1 by default)
     * @param lower lower bound(inclusive)
     * @param upper upper bound(exlusive)
     */
    randomize(lower: number = 0, upper: number = 1){
        for(let i = 0; i < this.rows; i++)
            for(let j = 0; j < this.cols; j++)
                this.matrix[i][j] = lower + ((upper-lower) * Math.random());
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
        this.funcMap((i: number,j: number) => i == j ? 1 : 0);
    }

    /**
     * Adds the matrix with a number/another matrix
     * @param addend The addend number/matrix
     */
    add(addend: number | Matrix){
        if(addend instanceof Matrix){
            if(this.rows != addend.rows || this.cols != addend.cols)
                throw new MatrixMismatchError("Incompatible matrices. Cannot add two matrices of different sizes")
            this.funcMap((i: number,j: number,val: number) => val + addend.matrix[i][j]);
        }
        else
            this.funcMap((i: number,j: number,val: number) => val + addend);        
    }

    /**
     * Subtracts the matrix with a number/another matrix
     * @param subtrahend The subtrahend matrix 
     */
    subtract(subtrahend: number | Matrix){
        if(subtrahend instanceof Matrix){
            if(this.rows != subtrahend.rows || this.cols != subtrahend.cols)
                throw new MatrixMismatchError("Incompatible matrices. Cannot subtract two matrices of different sizes")
            this.funcMap((i: number,j: number,val: number) => val - subtrahend.matrix[i][j]);
        }
        else
            this.funcMap((i: number,j: number,val: number) => val - subtrahend);
    }

    /**
     * Performs Hadamard multiplication
     * @param multiplicand The multiplicand matrix
     */
    hadamard(multiplicand: Matrix){
        if(this.rows != multiplicand.rows || this.cols != multiplicand.cols)
            throw new MatrixMismatchError("Incompatible matrices. Cannot multiply two matrices of different sizes")
        this.funcMap((i: number,j: number,val: number) => val * multiplicand.matrix[i][j]);
    }

    /**
     * Returns the dot product of the given matrices (performs Matrix Multiplication)
     * @param multiplicand The multiplicand matrix
     * @param multiplier The multiplier matrix
     */
    static multiply(multiplicand: Matrix, multiplier : Matrix): Matrix{
        if(multiplicand.cols != multiplier.rows)
            throw new MatrixMismatchError("Incompatible matrices. Number of columns in the multiplicand matrix must equal the number of rows of the multiplier matrix")
        
        let product = new Matrix(multiplicand.rows, multiplier.cols);
        product.funcMap((i: number,j: number,val: number) => {
            let sum = 0;
            for(let k = 0; k < multiplicand.cols; k++)
                sum += multiplicand.matrix[i][k] * multiplier.matrix[k][j];
            return sum;
        });
        
        return product;
    }

    /**
     * Multiplies all elements of the matrix with the given number. If the argument is a matrix, Hadamard multiplication is performed instead.
     * @param multiplier The multiplier number/matrix
     */
    multiply(multiplier: number | Matrix){
        if(multiplier instanceof Matrix)
            this.hadamard(multiplier);
        else
            this.funcMap((i: number,j: number,val: number) => val * multiplier);
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
        let transposed = Matrix.copy(input);
        return transposed.transpose();
    }
}