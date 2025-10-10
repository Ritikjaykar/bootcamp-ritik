interface PersonShape {
  name: string;
  age: number;
}

function printPerson(p: PersonShape) {
  console.log(`${p.name}, age ${p.age}`);
}

const extraPerson = {
  name: "Ritik",
  age: 22,
  city: "Jaipur",
};

printPerson(extraPerson); // Allowed (extra props ignored)
