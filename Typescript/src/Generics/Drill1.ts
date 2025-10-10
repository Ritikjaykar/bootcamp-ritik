//1.Generic Functions
//1.1. Write function identity<T>(arg: T): T

function identity<T>(arg: T): T {
  return arg;
}
// T is a generic type parameter.
// It allows arg and the return value to share the same type.


//1.2. Call with numbers, strings, and objects
let output1 = identity<number>(42); // output1 is of type number
let output2 = identity<string>("Hello"); // output2 is of type string
let output3 = identity({ name: "Ritik", age:21 }); // output3 is of type  name: string 


//1.3. Let TS infer vs passing <string> explicitly
identity("Hello");  //inferred as string(T)
identity<string>("Hello");  //explicitly passed as string(T)

//1.4. Try returning any instead — observe loss of safety
function identityAny(arg: any): any {
  return arg;
}
let val=identityAny(42);
val.toUpperCase();   //no error here















