import { Matrix } from '../mod.ts';
import { assertEquals, assertThrows } from "https://deno.land/std@0.53.0/testing/asserts.ts";

import { InvalidMatrixError } from "../src/errors.ts";

Deno.test("matrix creation (rows,cols)", () => {
    let rows = Math.round(Math.random()*10);
    let cols = Math.round(Math.random()*10);

    let myMatrix = new Matrix(rows,cols);
    assertEquals(rows,myMatrix.rows);
    assertEquals(cols,myMatrix.cols);

    myMatrix.matrix.forEach(row => row.forEach(value => assertEquals(value,0)));
});

Deno.test("matrix creation (matrix)", () =>{
    let arr = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ];
    let myMatrix = new Matrix(arr);
    assertEquals(myMatrix.rows , 3);
    assertEquals(myMatrix.cols , 3);
    assertEquals(myMatrix.matrix, arr);

    assertThrows(() => {
        arr.push([1,2,3,4]);
        myMatrix = new Matrix(arr);
    }, InvalidMatrixError);
})

Deno.test("funcMap", ()=> {
    let m1 = new Matrix(2,2);
    let m2 = m1;
    m2.funcMap((i: number,j: number,val: number) => val + 1);
    m2.matrix.forEach(row => row.forEach(value => assertEquals(value, 1)));
});

Deno.test("randomize", ()=> {
    let myMatrix = new Matrix(2,2);
    
    myMatrix.randomize();
    myMatrix.matrix.forEach(row => row.forEach(value => assertEquals(value >=0 && value < 1,true)));
    
    let lowerLimit = Math.round(Math.random()*100);
    let upperLimit = Math.round(Math.random()*100) + lowerLimit + 1;

    myMatrix.randomize(lowerLimit,upperLimit);
    myMatrix.matrix.forEach(row => row.forEach(value => assertEquals(value >= lowerLimit && value < upperLimit,true)));
});

Deno.test("round", () => {
    let m1 = new Matrix(2,2);
    let m2 = m1;
    m1.randomize();
    m1.round();
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value,Math.round(m2.matrix[i][j]))));
});

Deno.test("toZeroMatrix", ()=> {
    let myMatrix = new Matrix(2,2);
    myMatrix.randomize();
    myMatrix.toZeroMatrix();
    myMatrix.matrix.forEach(row => row.forEach(value => assertEquals(value , 0)));
});

Deno.test("toIdentityMatrix", ()=> {
    let myMatrix = new Matrix(2,2);
    myMatrix.randomize();
    myMatrix.toIdentityMatrix();
    myMatrix.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(i == j ? value == 1 : value == 0 , true)));
});

Deno.test("add", () => {
    let m1 = new Matrix(2,2);
    m1.randomize();

    let m2 = new Matrix(2,2);
    m2.randomize();
    
    let m1_copy = Matrix.copy(m1);
    m1.add(1);
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value , m1_copy.matrix[i][j] + 1)));

    m1.add(m2);
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value,m1_copy.matrix[i][j] + m2.matrix[i][j] + 1)));
});

Deno.test("subtract", () => {
    let m1 = new Matrix(2,2);
    m1.randomize();

    let m2 = new Matrix(2,2);
    m2.randomize();
    
    let m1_copy = Matrix.copy(m1);
    m1.subtract(1);
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value , m1_copy.matrix[i][j] - 1)));

    m1.subtract(m2);
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value,m1_copy.matrix[i][j] - m2.matrix[i][j] - 1)));
});

Deno.test("multiply", () => {
    let m1 = new Matrix(2,2);
    m1.randomize();

    let m2 = new Matrix(2,2);
    m2.randomize();
    
    let m1_copy = Matrix.copy(m1);
    m1.multiply(2);
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value , m1_copy.matrix[i][j] * 2)));

    m1.multiply(m2);
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value,m1_copy.matrix[i][j] * m2.matrix[i][j] * 2)));
});

Deno.test("transpose", () => {
    let m1 = new Matrix(2,3);
    m1.randomize(0,10);
    let m2 = Matrix.transpose(m1);
    m1.matrix.forEach((row,i) => row.forEach((value,j) => assertEquals(value , m2.matrix[j][i])));
});