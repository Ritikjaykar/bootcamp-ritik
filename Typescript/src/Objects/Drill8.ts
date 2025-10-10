const productPrices: Record<string, number> = {
  apple: 100,
  mango: 150,
  banana: 40,
};
console.log("Mango Price:", productPrices.mango);

const peopleMap = new Map<string, Person>();
peopleMap.set("ritik", { name: "Ritik", age: 22, id: "1" });
peopleMap.set("jay", { name: "Jay", age: 25, id: "2" });

console.log("People Map (ritik):", peopleMap.get("ritik"));

// Record → simple object
// Map → more flexible with methods and non-string keys