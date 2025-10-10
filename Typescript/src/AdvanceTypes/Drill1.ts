
// // 1) Union Types
type Status = "loading" | "success" | "error";

function handle(status: Status): void {
  switch (status) {
    case "loading":
      console.log("Status: loading (show spinner)");
      break;
    case "success":
      console.log("Status: success (show data)");
      break;
    case "error":
      console.log("Status: error (show error UI)");
      break;
    default: {
      // exhaustiveness check: if we forgot a case, `status` would not be `never` and the assignment below would fail
      const _exhaustive: never = status;
      throw new Error("Unhandled status: " + JSON.stringify(_exhaustive));
    }
  }
}

console.log(" Union Types");
handle("loading");
handle("success");
handle("error");












