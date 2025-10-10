// 3) Discriminated Unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default: {
      const _exhaustive: never = shape;
      throw new Error("Unhandled shape: " + JSON.stringify(_exhaustive));
    }
  }
}

console.log("\n Discriminated Unions ");
console.log("circle area:", area({ kind: "circle", radius: 2 }).toFixed(2));
console.log("square area:", area({ kind: "square", size: 3 }));
console.log("rect area:", area({ kind: "rectangle", width: 2, height: 5 }));