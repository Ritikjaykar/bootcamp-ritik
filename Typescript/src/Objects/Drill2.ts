// Interface
interface Car {
  make: string;
  model: string;
}

// Type alias
type Bike = {
  make: string;
  gears: number;
};

const car1: Car = { make: "Tesla", model: "Model 3" };
const bike1: Bike = { make: "Yamaha", gears: 6 };
console.log("Car:", car1);
console.log("Bike:", bike1);

// Extend interface
interface ElectricCar extends Car {
  batteryCapacity: number;
}
const ecar: ElectricCar = { make: "Tesla", model: "S", batteryCapacity: 100 };
console.log("ElectricCar:", ecar);

// Intersection type
type ElectricBike = Bike & { batteryCapacity: number };
const ebike: ElectricBike = { make: "Hero", gears: 5, batteryCapacity: 60 };
console.log("ElectricBike:", ebike);