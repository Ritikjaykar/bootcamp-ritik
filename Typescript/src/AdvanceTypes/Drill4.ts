//  4) Type Guards 
function isCircle(s: Shape): s is { kind: "circle"; radius: number } {
  return s.kind === "circle";
}

function areaUsingGuard(s: Shape): number {
  if (isCircle(s)) {
    // inside this branch TS knows s has radius
    return Math.PI * s.radius ** 2;
  }
  // use 'in' operator to narrow other shapes
  if ("size" in s) {
    return s.size ** 2; // square
  }
  // otherwise rectangle
  return s.width * s.height;
}

console.log("\n Type Guards ");
console.log("areaUsingGuard(circle):", areaUsingGuard({ kind: "circle", radius: 1 }));