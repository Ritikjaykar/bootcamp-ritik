function isEven(n: number): boolean {
  return n % 2 === 0;
}
if (isEven(4)) console.log("Even");

let counter = 3;
while (counter > 0) {
  console.log("counter:", counter--);
}

type Action = "start" | "stop";
function handleAction(action: Action) {
  switch (action) {
    case "start":
      console.log("Starting...");
      break;
    case "stop":
      console.log("Stopping...");
      break;
    default:
      const _exhaustive: never = action;
      throw new Error(`Unhandled case: ${_exhaustive}`);
  }
}
handleAction("start");
