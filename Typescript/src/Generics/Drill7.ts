//7: Conditional Types
// 7.1. Define IsString<T>
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

//7.2. ElementType<T>
type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<string[]>; // string
type B = ElementType<number[]>; // number
type C = ElementType<boolean>;  // boolean

// infer U extracts the array’s element type.