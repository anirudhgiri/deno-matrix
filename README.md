![deno-matrix logo](https://i.imgur.com/pnSUkZt.png)

![ci](https://github.com/anirudhgiri/deno-matrix/workflows/ci/badge.svg)
# deno-matrix

deno-matrix is a lightweight deno library to handle matrices.
## Installation

Use the `deno.land` URL service to import the module
```ts
import {Matrix} from 'https://deno.land/x/deno_matrix/mod.ts'
```

## Example

### Creating Matrices
```ts
let m1 = new Matrix(3,3);
m1.print(); // 3x3 matrix filled with zeroes

let arr = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
let m2 = new Matrix(arr); //3x3 matrix with values of array arr
```
### Matrix Operations
```ts
let m1 = new Matrix(3,3); // 3x3 Matrix creation
m1.randomize(); //fill Matrix with random values between 0-1

let m2 = new Matrix(3,3);
m2.randomize(5,10); //fill Matrix with random values between 0-1

m2.transpose(); //transpose Matrix

m1.add(5); //scalar addition
m1.add(m2); //Matrix addition

m2.subtract(1); //scalar subtraction
m2.subtract(m1); //matrix subtraction 

m2.multiply(5); //scalar multiplication

m1.hadamard(m2); //hadamard multiplication

let m3 = Matrix.multiply(m1,m2); //Matrix multiplication (dot product)

m3.print(); //print Matrix to console

let identity_matrix = new Matrix(3,3).toIdentityMatrix(); //Identity matrix creation

let zero_matrix = new Matrix(3,3).toZeroMatrix(); //Zero matrix creation
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
