function applyTwice(fn: (x: number) => number, val: number): number {
  return fn(fn(val));
}
const double = (n: number) => n * 2;
console.log("applyTwice:", applyTwice(double, 5));

function applyTwiceGeneric<T>(fn: (x: T) => T, val: T): T {
  return fn(fn(val));
}
console.log("applyTwiceGeneric:", applyTwiceGeneric(double, 10));