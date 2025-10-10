// 1Functions with parameters and return types
function add(a: number, b: number): number {
  return a + b;
}
console.log("add:", add(2, 3));

// 2️ Remove explicit return type → TypeScript infers it
function add2(a: number, b: number) {
  return a + b;
}
console.log("add2:", add2(5, 7));

// 3️ Function returning nothing (void)
function logMessage(): void {
  console.log("Hello, Ritik!");
}
logMessage();

// 4️Trying to return in void function → ❌ would be an error if uncommented
function wrongReturn(): void {
  // return "not allowed"; // ❌
}