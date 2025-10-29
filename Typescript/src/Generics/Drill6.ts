// //6: Mapped Types
// // type Readonly<T> = { readonly [K in keyof T]: T[K] };
// // This loops through every key in T and makes it readonly.

// //6.2. Apply to User
// interface User {
//   id: string;
//   age: number;
//   }
//   type ReadonlyUser = Readonly<User>;
  
//   // const ru: ReadonlyUser = { id: "1", age: 20 };
//   // ru.id = "2"; // Cannot assign to 'id' because it is a read-only property.
  
//   // 6.3. Add Partial<T>
//   type Partial<T> = { [K in keyof T]?: T[K] };
  
//   type PartialUser = Partial<User>;
//   const p: PartialUser = { id: "1" }; // age optional