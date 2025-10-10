function format(input: string | number | boolean): string {
  if (typeof input === "string") return input.toUpperCase();
  if (typeof input === "number") return input.toFixed(2);
  if (typeof input === "boolean") return input ? "TRUE" : "FALSE";
  const neverVal: never = input;
  return neverVal;
}
console.log("format string:", format("hello"));
console.log("format number:", format(42));
console.log("format boolean:", format(true));
