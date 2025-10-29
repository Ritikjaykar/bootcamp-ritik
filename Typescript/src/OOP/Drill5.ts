// console.log("\n Inheritance vs Composition");

// // Inheritance
// class Counter4 {
//   protected count = 0;
//   inc() { this.count++; }
//   dec() { this.count--; }
//   value() { return this.count; }
// }

// class BoundedCounter1 extends Counter4 {
//   constructor(private max: number) { super(); }

//   inc() {
//     if (this.count < this.max) super.inc();
//   }
// }

// const b1 = new BoundedCounter1(3);
// b1.inc(); b1.inc(); b1.inc(); b1.inc();
// console.log("BoundedCounter (Inheritance):", b1.value());

// // Composition
// class BoundedCounter2 {
//   constructor(private inner: Counter4, private max: number) {}

//   inc() {
//     if (this.inner.value() < this.max) this.inner.inc();
//   }

//   value() {
//     return this.inner.value();
//   }
// }

// const inner = new Counter4();
// const b2 = new BoundedCounter2(inner, 2);
// b2.inc(); b2.inc(); b2.inc();
// console.log("BoundedCounter (Composition):", b2.value());