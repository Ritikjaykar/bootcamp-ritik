//  OPTIONAL PROPERTIES

interface PersonOptional {
  name: string;
  age: number;
  middleName?: string;
}

const p1: PersonOptional = { name: "Ritik", age: 22 }; // middleName omitted
console.log("Optional middleName:", p1.middleName?.toUpperCase() ?? "Not Provided");