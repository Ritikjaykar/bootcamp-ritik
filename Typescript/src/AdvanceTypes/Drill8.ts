// 8) Indexed Access & Recursive Types 
type User = {
  id: string;
  profile: {
    name: string;
    address: { city: string };
  };
};

type City = User["profile"]["address"]["city"]; // string
const city: City = "Jaipur";
console.log("\n Indexed Access ");
console.log("City type value:", city);

// Recursive JsonValue
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };

const sampleJson: JsonValue = {
  name: "Ritik",
  tags: ["ts", "types"],
  meta: { active: true, score: 9.5, nested: { ok: null } },
};

console.log("\n Recursive JsonValue ");
console.log("Sample JSON:", JSON.stringify(sampleJson, null, 2));

//End Problem: Discriminated Union for API Responses 
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string }
  | { status: "loading" };

function render<T>(res: ApiResponse<T>): void {
  switch (res.status) {
    case "loading":
      console.log("[render] Loading… (spinner)");
      break;
    case "success":
      console.log("[render] Data:", res.data);
      break;
    case "error":
      console.error("[render] Error:", res.error);
      break;
    default: {
      const _exhaustive: never = res;
      throw new Error("Unhandled response: " + JSON.stringify(_exhaustive));
    }
  }
}

console.log("\n API Response render()");
render({ status: "loading" });
render({ status: "success", data: 42 });
render({ status: "error", error: "Server crash" });

console.log("\n Advanced Types - Module Loaded");
