// src/timerDemo.ts
console.time("myTimer");

let sum = 0;
for (let i = 1; i <= 1_000_000; i++) {
  sum += i;
}

console.timeEnd("myTimer");
console.log("Sum:", sum);
console.log(process.memoryUsage());
//moduleResolve.ts
console.log(require.resolve("http"));
