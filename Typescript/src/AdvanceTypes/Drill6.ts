// // 6) Utility Types in Depth 
// interface Person {
//   id?: string;
//   name?: string;
//   age?: number;
// }

// type ReqPerson = Required<Person>;     // all fields required (compile-time)
// type RO_Person = Readonly<Person>;     // readonly fields (compile-time)

// const rp: ReqPerson = { id: "1", name: "A", age: 30 };

// // ro: readonly test (mutation would fail at compile-time)
// // const ro: RO_Person = { id: "1" }; ro.id = "2"; // ❌ error if uncommented

// type Letters = "a" | "b" | "c";
// type ResultExcluded = Exclude<Letters, "a">; // "b" | "c"
// type OnlyLetters = Extract<Letters | number, string>; // "a" | "b" | "c"

// console.log("\n Utility Types");
// console.log("Required person:", rp);
// console.log("Exclude result type example allows 'b' or 'c' (not 'a').");