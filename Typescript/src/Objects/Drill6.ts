interface PersonBase {
  name: string;
  age: number;
}

interface Employee extends PersonBase {
  role: string;
  department?: string;
}

const emp: Employee = {
  name: "Ritik",
  age: 22,
  role: "Engineer",
};
console.log("Employee:", emp);
