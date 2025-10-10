type Person = {
  name: string;
  age: number;
  readonly id: string; // read-only field
};

const person1: Person = {
  name: "Ritik",
  age: 22,
  id: "abc123",
};

console.log("Person:", person1);

//  Wrong type example (commented out to avoid error)
// const wrongPerson: Person = { name: "Jay", age: "22", id: "id" };

//  Attempt to reassign readonly id (commented out)
// person1.id = "xyz";