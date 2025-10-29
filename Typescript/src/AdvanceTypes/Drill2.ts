//  2) Intersection Types
// type HasId = { id: string };
// type HasTimestamps = { createdAt: Date; updatedAt: Date };

// type Entity = HasId & HasTimestamps;

// const entityExample: Entity = {
//   id: "e1",
//   createdAt: new Date("2024-01-01"),
//   updatedAt: new Date("2024-01-02"),
// };

// console.log("\n Intersection Types ");
// console.log("Entity id:", entityExample.id);
// console.log("Created:", entityExample.createdAt.toISOString());

// If you omit createdAt or updatedAt you'd get a compile-time error (example shown commented):
// const bad: Entity = { id: "e2" }; // TS error: Property 'createdAt' is missing