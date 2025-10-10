console.log("\n Class Basics");
class Counter1 {
  private count: number;
  constructor(initial = 0) {
    this.count = initial;
  }
  inc() { this.count++; return this; }
  dec() { this.count--; return this; }
  value() { return this.count; }
}

const c1 = new Counter1(5);
console.log("Counter1 value:", c1.inc().inc().value()); // 7