console.log("\n Getters & Setters");
class Counter2 {
  private count: number = 0;
  private _step = 1;

  constructor(initial: number = 0) {
    this.count = initial;
  }

  get isZero() {
    return this.count === 0;
  }

  set step(n: number) {
    if (n < 0) throw new Error("Step cannot be negative");
    this._step = n;
  }

  inc() {
    this.count += this._step;
    return this;
  }

  value() {
    return this.count;
  }
}

const c2 = new Counter2();
c2.step = 2;
c2.inc().inc();
console.log("Counter2 value:", c2.value(), "isZero:", c2.isZero);