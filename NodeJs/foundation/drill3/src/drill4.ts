
// function greet(name: string): string {
//     return `Hello, ${name}!`;
//   }
  
//   const user = "Ritik";
//   console.log(greet(user));
  

import { add, multiply } from "@utils/math";

function greet(name: string): string {
  return `Hello, ${name}!`;
}

const user = "Ritik";
console.log(greet(user));
console.log("2 + 3 =", add(2, 3));
console.log("4 * 5 =", multiply(4, 5));
