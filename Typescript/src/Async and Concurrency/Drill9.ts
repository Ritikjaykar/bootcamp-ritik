// Fire-and-Forget (Carefully)
const promise = mockFetch(true);
promise.catch(err => console.log("Background error:", err.message));
