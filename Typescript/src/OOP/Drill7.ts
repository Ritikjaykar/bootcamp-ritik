console.log("\n Generic Classes & Invariants");
class GenericStore<T> {
  private open = false;
  private data = new Map<string, T>();

  openStore() { this.open = true; }
  closeStore() { this.open = false; }

  private requireOpen() {
    if (!this.open) throw new Error("Store is closed");
  }

  get(key: string): T | undefined {
    this.requireOpen();
    return this.data.get(key);
  }

  set(key: string, value: T) {
    this.requireOpen();
    this.data.set(key, value);
  }
}

const gs = new GenericStore<string>();
gs.openStore();
gs.set("greet", "Hello");
console.log("GenericStore value:", gs.get("greet"));