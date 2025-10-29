// src/debugDemo.ts

// Step 1: define the array
const numbers = [1, 2, 3, 4, 5];

// Step 2: use console.table
console.table(numbers.map(n => ({ number: n, square: n * n })));

// Step 3: sum with debugger
const sum = numbers.reduce((acc, val) => {
  debugger; // Node will pause here if run with --inspect-brk
  return acc + val;
}, 0);

console.log("Sum:", sum);

// Step 4: trigger uncaught error (optional)
throw new Error("This is an uncaught error!");
