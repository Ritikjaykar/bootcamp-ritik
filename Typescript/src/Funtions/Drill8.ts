function squareOld(n: number): number {
  return n * n;
}
const square = (n: number): number => n * n;
console.log("square:", square(4));

const numbers = [1, 2, 3, 4];
const squares = numbers.map(n => n * n);
console.log("squares array:", squares);

const doubleInferred = (n: number) => n * 2;
console.log("doubleInferred:", doubleInferred(8));