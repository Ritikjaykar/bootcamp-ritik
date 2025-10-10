//  OPTIONAL & DEFAULT PARAMETERS


// 1 Optional parameter
function greet(name: string, age?: number) {
  console.log(`Hello ${name}, age: ${age}`);
}
greet("Ritik");
greet("Ritik", 22);

// 2️ Default value
function greetDefault(name: string, age: number = 18) {
  console.log(`Hi ${name}, you are ${age} years old.`);
}
greetDefault("Ritik");
greetDefault("Jaykar", 25);
