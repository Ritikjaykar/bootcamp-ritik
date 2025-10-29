// //3: Constraints

// //1.1. Define function with constraint
// function lengthOf<T extends { length: number }>(x: T): number {
//   return x.length;
//   }
//   //T extends { length: number } means T must have a .length property.
  
//   //1.2.Call with string, array, object with length
//   console.log(lengthOf("Hello"));          // 5 
//   console.log(lengthOf([1, 2, 3]));        // 3 
//   console.log(lengthOf({ length: 10 }));   // 10 
  
//   //1.3.Try number
//   lengthOf(42); // Error: number doesn't have a .length property
  
//   //1.4. Multiple constraints
//   interface HasId{id:string}
//   interface HasName{name:string}
  
//   function printInfo<T extends HasId & HasName>(obj: T) { //& combines both interfaces
//   console.log(obj.id, obj.name);
//   }
//   printInfo({ id: "123", name: "Ritik" }); // Works and T must have both id and name.