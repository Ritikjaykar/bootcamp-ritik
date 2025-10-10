//8: Utility Types in Practice
//8.1. Record<string, T> for dictionary
const prices: Record<string, number> = {
  apple: 100,
  banana: 60,
  };
  
  //8.2. Pick and Omit
  interface User {
  id: string;
  name: string;
  age: number;
  }
  
  type OnlyId = Pick<User, "id">;     // { id: string }
  type NoAge = Omit<User, "age">;     // { id: string; name: string }
  
  //8.3. Combine with generics in function pluck
  function pluck<T, K extends keyof T>(objs: T[], key: K): T[K][] {  //TypeScript ensures key is valid for T.
  return objs.map(obj => obj[key]);  //Return type automatically matches the property’s type.
  }
  
  const users = [
  { id: "u1", name: "Ritik", age: 21 },
  { id: "u2", name: "Jay", age: 23 },
  ];
  
  console.log(pluck(users, "name")); // ["Ritik", "Jay"]
  