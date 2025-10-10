type PersonUtil = {
  name: string;
  age: number;
  id: string;
};

type PartialPerson = Partial<PersonUtil>;
type NameOnly = Pick<PersonUtil, "name">;
type WithoutAge = Omit<PersonUtil, "age">;

const pPartial: PartialPerson = { name: "Ritik" };
const pName: NameOnly = { name: "Jay" };
const pNoAge: WithoutAge = { name: "Ritik", id: "1" };

console.log("PartialPerson:", pPartial);
console.log("NameOnly:", pName);
console.log("WithoutAge:", pNoAge);

type Custom = Omit<Partial<PersonUtil>, "id">;