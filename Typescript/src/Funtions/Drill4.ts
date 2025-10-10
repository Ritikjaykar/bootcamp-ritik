//  FUNCTION OVERLOADING


function toArray(x: string): string[];
function toArray(x: number): number[];
function toArray(x: any): any[] {
  return [x];
}
console.log("toArray string:", toArray("hello"));
console.log("toArray number:", toArray(42));