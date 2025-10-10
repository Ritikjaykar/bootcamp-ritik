//5: keyof & Lookup Types

//1.1. Create type Keys<T> = keyof T
type Keys<T> = keyof T;

// 1.2. Given interface
interface User{
id:string;
name:string;
}
type UserKeys=Keys<User>; // "id" | "name"


//1.3. Write function getProp
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
return obj[key];
}

//1.4. Call examples
const user = { id: "u1", age: 22 };

console.log(getProp(user, "id")); // string 
console.log(getProp(user, "age")); // number 
console.log(getProp(user, "missing")); //  Error - key not in User
