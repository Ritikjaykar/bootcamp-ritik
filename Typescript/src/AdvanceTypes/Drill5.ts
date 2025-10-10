//  5) Conditional Types (Deeper) 
type PromiseType<T> = T extends Promise<infer U> ? U : T;

type PT1 = PromiseType<Promise<string>>; // string
type PT2 = PromiseType<Promise<number>>; // number
type PT3 = PromiseType<boolean>; // boolean

// We can demonstrate by typing variables:
const p1: PT1 = "hello"; // ok
const p2: PT2 = 42;      // ok
const p3: PT3 = true;    // ok
console.log("\n Conditional Types ");
console.log("PT1 (string):", p1, "PT2 (number):", p2, "PT3 (boolean):", p3);

type Nullable<T> = T | null;
type NonNullableCustom<T> = T extends null | undefined ? never : T;

type NN = NonNullableCustom<string | null | undefined>; // string
const nnValue: NN = "I am not null";
console.log("NonNullableCustom example:", nnValue);
