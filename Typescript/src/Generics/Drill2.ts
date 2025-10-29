// //2: Arrays & Collections

// //1.1. Write function first<T>(arr: T[]): T | undefined
// function first<T>(arr: T[]): T | undefined {
//   return arr[0];
// }
// //returns the first element of an array 

// //1.2. Call with arrays of numbers and strings
// console.log(first([1, 2, 3])); // Output: 1
// console.log(first(["a", "b", "c"])); // Output: "a"

// //1.3. Try first([1, "two"])
// const mixed = first([1, "two"]); // type inferred as (string | number) 
// console.log(mixed); // Output: 1