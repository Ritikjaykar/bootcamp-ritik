console.log("\n Static Members & Factory Functions");
class Counter3 {
  static created = 0;
  private count: number;

  constructor(initial: number = 0) {
    this.count = initial;
    Counter3.created++;
  }

  static fromJSON(json: string): Counter3 {
    const data = JSON.parse(json);
    return new Counter3(data.count);
  }

  inc() {
    this.count++;
    return this;
  }

  value() {
    return this.count;
  }
}

const c3a = new Counter3(3);
const c3b = Counter3.fromJSON('{"count":10}');
console.log("Counter3 values:", c3a.inc().value(), c3b.value());
console.log("Total created:", Counter3.created);

function makeCounter(initial = 0) {
  let count = initial;
  return {
    inc: () => (++count, count),
    value: () => count,
  };
}

const mc = makeCounter(5);
console.log("makeCounter:", mc.inc(), mc.value());
