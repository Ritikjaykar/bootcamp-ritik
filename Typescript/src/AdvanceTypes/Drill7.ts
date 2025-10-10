//7) Template Literal Types 
type Events = "click" | "hover" | "focus";
type EventHandlerNames = `on${Capitalize<Events>}`; // "onClick" | "onHover" | "onFocus"

// runtime values matching the type:
const handlers: EventHandlerNames[] = ["onClick", "onHover", "onFocus"];
console.log("\n  Template Literal Types ");
console.log("Handlers:", handlers.join(", "));