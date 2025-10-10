console.log("\n Abstract Contracts");
abstract class Store<T> {
  abstract get(key: string): T | undefined;
  abstract set(key: string, value: T): void;
  abstract has(key: string): boolean;
}

class MemoryStore<T> extends Store<T> {
  private data = new Map<string, T>();

  get(key: string) { return this.data.get(key); }
  set(key: string, value: T) { this.data.set(key, value); }
  has(key: string) { return this.data.has(key); }
}

const store = new MemoryStore<number>();
store.set("a", 100);
console.log("Store has 'a'?", store.has("a"), "Value:", store.get("a"));
