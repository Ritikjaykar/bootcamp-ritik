// 1️Sum of all numbers
function sumAll(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
console.log("sumAll:", sumAll(1, 2, 3, 4));

// 2️Flexible: handle string or number
function sumFlexible(...values: (string | number)[]): number {
  return values.reduce((sum, v) => sum + Number(v), 0);
}
console.log("sumFlexible:", sumFlexible(1, "2", 3));
