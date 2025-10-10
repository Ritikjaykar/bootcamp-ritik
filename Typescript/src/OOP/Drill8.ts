console.log("\n Class-Friendly Patterns");

// Strategy Pattern
interface Sorter {
  sort<T>(xs: T[]): T[];
}

class QuickSort implements Sorter {
  sort<T>(xs: T[]): T[] { return xs.sort(); }
}

class StableSort implements Sorter {
  sort<T>(xs: T[]): T[] { return [...xs].sort(); }
}

class ListService {
  constructor(private sorter: Sorter) {}
  sortList<T>(xs: T[]) {
    return this.sorter.sort(xs);
  }
}

const quick = new ListService(new QuickSort());
const stable = new ListService(new StableSort());
console.log("QuickSort:", quick.sortList([3, 1, 2]));
console.log("StableSort:", stable.sortList([3, 1, 2]));

// Null Object Pattern
interface Logger { info(msg: string): void; error(msg: string): void; }

class NoopLogger implements Logger {
  info() {} error() {}
}

const logger = new NoopLogger();
logger.info("Nothing happens here.");

// Value Object Pattern
class Money {
  readonly amount: number;
  readonly currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this);
  }

  add(other: Money) {
    if (other.currency !== this.currency) throw new Error("Currency mismatch");
    return new Money(this.amount + other.amount, this.currency);
  }

  equals(other: Money) {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

const m1 = new Money(50, "USD");
const m2 = new Money(70, "USD");
const total = m1.add(m2);
console.log("Money add:", total.amount, total.currency);
console.log("Money equals:", m1.equals(m2));